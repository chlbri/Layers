import I_UseCase from "../../contract/IUseCase";
import E_Folder from "../../entities/io/Folder";
import MetaData from "../../contract/storage/MetaData";
import { extname, basename, join, dirname } from "path";
import fs, { readdir, exists } from "fs";
import ReturnData, {
  Response500,
  Response300,
  Response404,
  GoodResponse,
  Response204,
} from "../../contract/ReturnData";
import { isEmpty } from "lodash";
import { Nullish } from "../../../core/Nullish";

function getFolderLengthSync(uri: string) {
  return getFolderFilesSync(uri).length;
}

function getFolderLengthAsync(uri: string) {
  const outside = getFolderFilesAsync(uri).length;
  return outside > 0 ? outside : -1;
}

function getFolderFilesSync(uri: string, ...exts: string[]) {
  let out = fs.readdirSync(uri);
  if (!isEmpty(exts) && !exts.some(isEmpty))
    out = out.filter((val) => exts.includes(extname(val)));
  return out;
}

function getFolderFilesAsync(uri: string, ...exts: string[]) {
  const start: string[] = [];
  fs.readdir(uri, (err, files) => {
    if (!err) {
      start.push(...files);
    }
  });
  let out = [...start];
  if (!isEmpty(exts) && !exts.some(isEmpty))
    out = out.filter((val) => exts.includes(extname(val)));
  return out;
}

function checkDirSync(uri: string) {
  const _dirName = dirname(uri);
}

// function checkDirASync(uri: string) {}

function renameAsync(
  uri: string,
  newuri: string,
  inner: ReturnData<E_Folder, undefined>,
  file: E_Folder,
  label: string,
  force = false
) {
  fs.exists(uri, (exists) => {
    if (exists) {
      const len = getFolderLengthAsync(uri);
      if (force || len === 0) {
        let out: ReturnData<E_Folder> = {
          status: 200,
          payload: { ...file, label, uri: newuri },
        };
        fs.rename(uri, newuri, (err) => {
          if (err) out = Response404;
        });
        return out;
      }
    }
  });
  return inner;
}

function renameSync(
  uri: string,
  newuri: string,
  inner: ReturnData<E_Folder>,
  file: E_Folder,
  label: string,
  force = false
) {
  if (fs.existsSync(uri)) {
    const len = getFolderLengthSync(uri);
    if (force || len === 0) {
      fs.renameSync(uri, newuri);
      const out: ReturnData<E_Folder> = {
        status: 200,
        payload: { ...file, label, uri: newuri },
      };
      return out;
    }
  }
  return inner;
}

function createSync(
  folder: E_Folder,
  mode?: Nullish<string | number>
) {
  const uri = folder.uri;
  fs.mkdirSync(uri, mode);
  const out: GoodResponse<E_Folder> = {
    status: 200,
    payload: folder,
  };
  return out;
}

function createAsync(
  folder: E_Folder,
  inner: ReturnData<E_Folder, undefined>,
  mode?: Nullish<string | number>
) {
  const uri = folder.uri;
  let out: ReturnData<E_Folder> = {
    status: 200,
    payload: folder,
  };
  fs.mkdir(uri, mode, (err) => {
    if (err) out = inner;
  });
  return out;
}

function getAllExtFilesSync(
  uri: string,
  inner: ReturnData<string[]>,
  ...exts: string[]
) {
  if (fs.existsSync(uri)) {
    const files = getFolderFilesSync(uri, ...exts);
    const out = isEmpty(files)
      ? Response300
      : ({
          status: 200,
          payload: files,
        } as ReturnData<string[]>);
    return out;
  }
  return inner;
}

function getAllExtFilesAsync(
  uri: string,
  out: ReturnData<string[]>,
  ...exts: string[]
) {
  fs.exists(uri, (exists) => {
    if (exists) {
      const files = getFolderFilesAsync(uri, ...exts);
      out = isEmpty(files)
        ? Response300
        : {
            status: 200,
            payload: files,
          };
    }
  });
  return out;
}

const _setMetadata = {
  call(folder: E_Folder, metadata: MetaData) {
    const metadata2 = { ...folder.metadata, ...metadata };
    //TODO: stocker le fichier
    return { ...folder, metadata: metadata2 };
  },
};

const _delete = {
  call(folder: E_Folder, metadata: MetaData) {
    //TODO: stocker le fichier
  },
};

const _rename = {
  call(folder: E_Folder, label: string, force = false) {
    let out: ReturnData<E_Folder> = Response500;
    if (isEmpty(label)) return out;
    const isFromApp = folder.metadata.isFromApp;
    const uri = folder.uri;
    const _dirName = dirname(uri);
    out = Response300;
    const newuri = join(_dirName, label);

    const parameters = [
      uri,
      newuri,
      out,
      folder,
      label,
      force,
    ] as const;

    out = isFromApp
      ? renameSync(...parameters)
      : renameAsync(...parameters);

    return out;
  },
};

const _create = {
  call(folder: E_Folder, mode?: Nullish<string | number>) {
    let out: ReturnData<E_Folder> = Response404;
    const isFromApp = folder.metadata.isFromApp;
    const uri = folder.uri;
    fs.mkdirSync(uri);
    out = isFromApp
      ? createSync(folder, mode)
      : createAsync(folder, out, mode);
    return out;
  },
};

const _getAllExtFiles = {
  call(folder: E_Folder, ...exts: string[]) {
    let out: ReturnData<string[]> = Response404;
    const uri = folder.uri;
    const isFromApp = folder.metadata.isFromApp;
    const parameters = [uri, out, ...exts] as const;
    out = isFromApp
      ? getAllExtFilesSync(...parameters)
      : getAllExtFilesAsync(...parameters);
    return out;
  },
};

const io_file_domain = {
  _setMetadata,
  _delete,
  _rename,
  _create,
  _getAllExtFiles,
};

export default io_file_domain;

export { getFolderLengthSync, getFolderLengthAsync };

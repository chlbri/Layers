import I_UseCase from "../../contract/IUseCase";
import E_File from "../../entities/io/File";
import MetaData from "../../contract/storage/MetaData";
import { extname, basename, join, dirname } from "path";
import fs from "fs";
import ReturnData, {
  Response500,
  Response300,
  Response404,
} from "../../contract/ReturnData";
import { isEmpty } from "lodash";

// #region Config
const TEXT_EXTENSIONS = [".txt", ".srt", ".json", ".csv"];

function renameAsync(
  uri: string,
  newuri: string,
  inner: ReturnData<E_File, undefined>,
  file: E_File,
  label: string
) {
  fs.exists(uri, (exists) => {
    if (exists) {
      let out: ReturnData<E_File> = {
        status: 200,
        payload: { ...file, label, uri: newuri },
      };
      fs.rename(uri, newuri, (err) => {
        if (err) out = Response404;
      });
      return out;
    }
  });
  return inner;
}

function renameSync(
  uri: string,
  newuri: string,
  inner: ReturnData<E_File>,
  file: E_File,
  label: string
) {
  if (fs.existsSync(uri)) {
    fs.renameSync(uri, newuri);
    const out: ReturnData<E_File> = {
      status: 200,
      payload: { ...file, label, uri: newuri },
    };
    return out;
  }
  return inner;
}
// #endregion

const _setMetadata = {
  call(file: E_File, metadata: MetaData) {
    const out = { ...file } as E_File;
    const metadata2 = { ...file.metadata, ...metadata };
    out.metadata = metadata2;
    //TODO: stocker le fichier
    return out;
  },
};

const _delete = {
  call(file: E_File, metadata: MetaData) {
    //TODO: stocker le fichier
  },
};


const _checkExtensions = {
  /**
   * 
   * @param file L'adresse du ficier
   * @param checkers 
   */
  call(uri: string, ...checkers: string[]) {
    for (const checker of checkers) {

      if (extname(uri).toLowerCase() === checker.toLowerCase())
        return true;
    }
    return false;
  },
};

const _rename = {
  call(file: E_File, label: string) {
    //TODO: stocker le fichier
    let out: ReturnData<E_File> = Response500;
    if (isEmpty(label)) return out;
    const isFromApp = file.metadata.isFromApp;
    const uri = file.uri;
    const ext = extname(uri);
    const _dirName = dirname(uri);
    out = Response300;
    const newuri = join(_dirName, `${label}${ext}`);
    const parameters = [uri, newuri, out, file, label] as const;
    if (isFromApp) {
      out = renameSync(...parameters);
    } else {
      out = renameAsync(...parameters);
    }
    return out;
  },
};

const _create = {
  call(file: E_File) {
    const uri = file.uri;
    if (_checkExtensions.call(uri, ...TEXT_EXTENSIONS)) {
      fs.writeFileSync("txt.txt", "svfhdfkd");
    }
    //TODO: stocker le fichier
    return file;
  },
};

const io_file_domain = {
  _setMetadata,
  _delete,
  _checkExtensions,
  _rename,
  _create,
};

const d = _rename.call({
  uri: "rename.txt",
  metadata: {
    isFromApp: true,
  },
  
}, 'rename2');
console.log(d);


export default io_file_domain;
export { TEXT_EXTENSIONS };
// export { renameAsync, renameSync };

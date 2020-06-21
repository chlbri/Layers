import fs from "fs";
import io_file_domain from "./file";
import useCase from "../../contract/useCase";
import ReturnData, {
  Response300,
  Response500,
  Response404,
} from "../../contract/ReturnData";
import E_File from "../../entities/io/File";
import { isEmpty } from "lodash";

function reducerStringArray(prev: string, current: string) {
  return `${prev}\n${current}`;
}

const checkExtensions = useCase(io_file_domain, "_checkExtensions");

function readCheckerAsync(
  err: NodeJS.ErrnoException | null,
  data: string
) {
  let out: ReturnData<string>;
  if (err) {
    out = {
      status: 404,
    };
  } else {
    if (isEmpty(data)) {
      out = {
        status: 204,
        payload: "Empty",
      };
    } else {
      out = {
        status: 200,
        payload: data,
      };
    }
  }
  return out;
}

function readCheckerSync(data: string) {
  const out: ReturnData<string> = isEmpty(data)
    ? {
        status: 204,
        payload: "Empty",
      }
    : {
        status: 200,
        payload: data,
      };
  return out;
}

function writeOrAppendAsync(
  texts: string[],
  path: string,
  op: "appendFile" | "writeFile"
) {
  let out: ReturnData<string> = Response500;
  if (isEmpty(texts)) return out;
  if (checkExtensions(path, ...TEXT_EXTENSIONS)) {
    const append = texts.reduce(reducerStringArray);
    out = Response300;
    fs.exists(path, (exists) => {
      if (exists) {
        out = {
          status: 200,
          payload: append,
        };
        fs[op](path, append, { encoding: "utf8" }, () => {
          out = Response404;
        });
      }
    });
  }
  return out;
}

function writeOrAppendSync(
  texts: string[],
  path: string,
  op: "appendFileSync" | "writeFileSync"
) {
  let out: ReturnData<string> = Response500;
  if (isEmpty(texts)) return out;
  if (checkExtensions(path, ...TEXT_EXTENSIONS)) {
    const append = texts.reduce(reducerStringArray);
    out = Response300;
    if (fs.existsSync(path)) {
      fs[op](path, append, { encoding: "utf8" });
      out = {
        status: 200,
        payload: append,
      };
    }
  }
  return out;
}

function readTextSync(
  uri: string,
  out: ReturnData<string, undefined>
) {
  if (fs.existsSync(uri)) {
    const data = fs.readFileSync(uri, { encoding: "utf8" });
    return readCheckerSync(data);
  }
  return out;
}

function readTextAsync(
  uri: string,
  inner: ReturnData<string, undefined>
) {
  let out = { ...inner } as ReturnData<string, undefined>;
  fs.exists(uri, (exists) => {
    if (exists)
      fs.readFile(
        uri,
        { encoding: "utf8" },
        (err, data) => (out = readCheckerAsync(err, data))
      );
  });
  return out;
}

const TEXT_EXTENSIONS = ["txt", "srt", "json", "csv"];

const _appendText = {
  /**
   * Retournes faux si le fichier n'existe pas, FetchStatus
   * @param file l'uri du fichier
   * @param texts Les textes à ajouter au fichier
   */
  call(file: E_File, ...texts: string[]) {
    return file.metadata.isFromApp
      ? writeOrAppendSync(texts, file.uri, "appendFileSync")
      : writeOrAppendAsync(texts, file.uri, "appendFile");
  },
};

const _writeText = {
  call(file: E_File, ...texts: string[]) {
    return file.metadata.isFromApp
      ? writeOrAppendSync(texts, file.uri, "writeFileSync")
      : writeOrAppendAsync(texts, file.uri, "writeFile");
  },
};

const _readText = {
  call(file: E_File) {
    let out: ReturnData<string> = Response500;
    const uri = file.uri;
    if (checkExtensions(uri, ...TEXT_EXTENSIONS)) {
      out = Response300;
      if (file.metadata.isFromApp) {
        out = readTextSync(uri, out);
      } else {
        out = readTextAsync(uri, out);
      }
    }
    return out;
  },
};

const _deleteText = {
  call(file: E_File) {
    return _writeText.call(file, "");
  },
};

const io_text_domain = {
  _appendText,
  _writeText,
  _readText,
  _deleteText,
};

export default io_text_domain;

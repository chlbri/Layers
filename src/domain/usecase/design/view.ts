import CopyWith from "../../contract/CopyWith";
import E_View from "../../entities/design/View";

const _create = {
  call(view: E_View) {
    const out: E_View = {
      //TODO: Use uuid.v4()
      _id: "",
      ...view,
    };
    return out;
  },
} as const;

const _update = {
  call(sealed: E_View, change: E_View) {
    return CopyWith(sealed, change);
  },
} as const;

const domain = {
  _create,
  _update,
} as const;

export default domain;

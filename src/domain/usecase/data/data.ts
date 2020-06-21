const _changeSchema = {
  call() {
    throw new Error("Method not implemented.");
  },
} as const;

const _choose = {
  call() {
    throw new Error("Method not implemented.");
  },
} as const;

const _delete = {
  call() {
    throw new Error("Method not implemented.");
  },
} as const;

const domain = {
  _changeSchema,
  _choose,
  _delete,
} as const;

domain._changeSchema.call();

export default domain;

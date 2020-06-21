import E_PlatformPayment from "../../entities/payment/Platform";

const _configure = {
  call() {
    throw new Error("Method not implemented.");
  },
} as const;

const _assign = {
  call() {
    throw new Error("Method not implemented.");
  },
} as const;

const domain = {
  _configure,
  _assign,
} as const;

export default domain;

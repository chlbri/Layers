import E_Task from "../../../domain/entities/task";
import SchemaClass from "../../../domain/contract/Pipe";

const S_Task: SchemaClass<E_Task> = {
  propParams: {
    createdAt: () => true,
    label: () => true,
    desc: () => true,
    deletedAt: () => true,
    uid: () => true
  },
  // classParams: () => true
};

export default S_Task;

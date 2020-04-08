import Schema from "../contract/types/schema";
import E_Task from "../entity/task";

const S_Task: Schema<E_Task> = {
  propParams: {
    createdAt: d => true,
    updates: d => true,
    label: d => true,
    desc: d => true,
    deletedAt: d => true,
    _id: d => true
  },
  classParams: arg => true
};

export default S_Task;

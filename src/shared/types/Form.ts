import { Form } from "../schemas/form.schema";
import { ItemBlockProps } from "./Items";

export interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (updatedExpense: Form) => void;
    title: string;
    type: "edit";
    item?: ItemBlockProps;
}
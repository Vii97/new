"use client";

// Importaciones
import { Modal, ModalContent, ModalBody, ModalHeader, Button, Input, Textarea } from "@heroui/react";
import { ModalComponentProps } from "@/shared/types/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, Form } from "@/shared/schemas/form.schema"; 
import { Controller, useForm } from "react-hook-form";
import { updateItem } from "@/shared/services/updateItem.service";
import { useRouter } from "next/navigation";
import { toast } from "nextjs-toast-notify";

// Component ModalComponentProps
const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, onConfirm, title, item }) => {
    // Declaro constantes
    const router = useRouter();
    const itemId = item?.id;

    // Configuro el formulario
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Form>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: item?.name || "",
            price: item?.price || 0,
            description: item?.description || "",
        }
    });

    // Envío del formulario
    const onSubmit = async (dataItem: Form) => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/");
            return;
        }

        // Actualizo el ítem una vez es editado
        try {
            if (dataItem && itemId) {
                const updatedItem = { ...dataItem };
                console.log("Ítem actualizado:", updatedItem);
                const result = await updateItem(updatedItem, String(itemId));
                onConfirm(result);
                onClose();
                toast.success("¡Guardado!", {
                    duration: 4000,
                    position: "top-center",
                    transition: "bounceIn",
                });
            }
        } catch (error) {
            console.error("Error al guardar:", error);
            toast.error("Error al guardar el ítem", {
                duration: 4000,
                position: "top-center",
                transition: "bounceIn",
            });
        }
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose} className="mx-auto items-center justify-center bg-purple-800 bg-opacity-100">
            <ModalContent className="bg-white rounded-lg w-full max-w-xl mx-4 p-6">
                <ModalHeader className="text-xl font-bold text-black mx-auto">{title}</ModalHeader>
                <ModalBody className="w-full mx-auto p-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    autoFocus
                                    label="Nombre del producto"
                                    placeholder="Nombre"
                                    isInvalid={!!errors.name}
                                    errorMessage={errors.name?.message}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            )}
                        />
            
                        <Controller
                            name="price"
                            control={control}
                            render={({ field }) => (
                                <Input
                                type="number"
                                label="Precio"
                                placeholder="0"
                                isInvalid={!!errors.price}
                                errorMessage={errors.price?.message}
                                value={String(field.value)} 
                                onChange={(e) => field.onChange(Number(e.target.value))}  
                                />
                            )}
                            />
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    label="Descripción"
                                    placeholder="Describe el ítem"
                                    isInvalid={!!errors.description}
                                    errorMessage={errors.description?.message}
                                    {...field}
                                />
                            )}
                        />
                        <div className="flex justify-center space-x-4 pt-6">
                            <Button
                                onPress={onClose}
                                className="px-6 py-2 text-white rounded-lg bg-fuchsia-500 hover:bg-fuchsia-700">
                                Cancelar
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                isLoading={isSubmitting}
                                className={`px-6 py-2 rounded-lg focus:outline-none  bg-indigo-500 hover:bg-indigo-700`}>
                                Guardar cambios
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ModalComponent;
import { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import axios from "axios";

export default function ModalForm({
    show,
    onClose,
    task = null,
    token,
    fetchTasks,
    currentPage,
}) {
    const { data, setData, processing, reset } = useForm({
        title: "",
        description: "",
        deadline: "",
        status: "",
    });

    const formatDate = (date) => {
        if (date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        }
    };

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors({});
        if (task) {
            setData({
                id: task.id,
                title: task.title,
                description: task.description,
                deadline: formatDate(task.deadline),
                status: task.status,
            });
        } else {
            setData({
                title: "",
                description: "",
                deadline: "",
                status: "",
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = data.id ? `/api/tasks/${data.id}` : "/api/tasks";
        const method = data.id ? "put" : "post";

        try {
            const response = await axios({
                method,
                url,
                data: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200 || response.status === 201) {
                onClose();
                reset();
                fetchTasks(currentPage);
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };
    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-6">
                <div className="flex justify-between">
                    <h2 className="text-xl mb-4 font-bold">
                        {data.id ? "Update Task" : "Tambah Tasklist"}
                    </h2>
                    <i
                        onClick={onClose}
                        className="bi bi-x-lg cursor-pointer"
                    ></i>
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="title" value="Tasklist" />
                    <TextInput
                        id="title"
                        name="title"
                        value={data.title || ""}
                        className="mt-1 block w-full"
                        placeholder="Masukan judul tasklist"
                        isFocused={true}
                        onChange={handleChange}
                    />
                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="description" value="Description" />
                    <textarea
                        id="description"
                        name="description"
                        rows="5"
                        value={data.description || ""}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        placeholder="Masukan deskripsi tasklist"
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="deadline" value="Deadline" />
                    <TextInput
                        id="deadline"
                        name="deadline"
                        type="date"
                        value={formatDate(data.deadline) || ""}
                        className="mt-1 block w-full"
                        placeholder="Masukan deadline"
                        isFocused={true}
                        onChange={handleChange}
                    />
                    <InputError message={errors.deadline} className="mt-2" />
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="status" value="Status" />
                    <select
                        id="status"
                        name="status"
                        value={data.status || ""}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    >
                        <option value="">Pilih Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <InputError message={errors.status} className="mt-2" />
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-500 rounded-md hover:underline"
                    >
                        Kembali
                    </button>
                    <PrimaryButton type="submit" disabled={processing}>
                        {data.id ? "Update Task" : "Tambah Data"}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}

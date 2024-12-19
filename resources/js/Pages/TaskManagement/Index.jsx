import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Pagination from "@/Components/Pagination";
import Dropdown from "@/Components/Dropdown.jsx";
import ModalForm from "@/Pages/TaskManagement/Partial/ModalForm.jsx";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function Dashboard({ token }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTasks = async (page = 1) => {
        try {
            const response = await axios.get(`/api/tasks?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(response.data.data.data);
            setCurrentPage(response.data.data.current_page);
            setTotalPages(response.data.data.last_page);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this task?")) {
            try {
                const response = await axios.delete(`/api/tasks/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setTasks((prevTasks) =>
                        prevTasks.filter((task) => task.id !== id)
                    );
                }
            } catch (error) {
                console.error("Error deleting task:", error);
                alert("Failed to delete the task.");
            }
        }
    };

    const handleChangeStatus = async (newStatus, id) => {
        try {
            const response = await axios.patch(
                `/api/tasks/${id}/change-status`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchTasks(currentPage);
        } catch (err) {
            console.error("Error updating task status:", err);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const openModal = (task = null) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTask(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchTasks(currentPage);
    }, [currentPage, token]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <AuthenticatedLayout>
                <Head title="Dashboard" />
                <div className="py-12 text-center">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">Loading...</div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <>
            <ModalForm
                show={isModalOpen}
                onClose={closeModal}
                token={token}
                task={selectedTask}
                fetchTasks={fetchTasks}
                currentPage={currentPage}
            />
            <AuthenticatedLayout>
                <Head title="Dashboard" />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h1 className="text-lg mb-2">Cari Data</h1>
                                <div className="flex flex-row justify-between gap-4 border-b pb-6 mb-6">
                                    <TextInput
                                        id="search"
                                        name="search"
                                        placeholder="search"
                                        className="block w-5/6"
                                        isFocused={true}
                                    />
                                    <PrimaryButton
                                        onClick={openModal}
                                        className="w-1/6"
                                    >
                                        Tambah Data
                                    </PrimaryButton>
                                </div>
                                {tasks.length > 0 ? (
                                    <div className="relative">
                                        <table className="min-w-full text-sm">
                                            <thead>
                                                <tr>
                                                    <th className="py-2 px-2 text-center">
                                                        No
                                                    </th>
                                                    <th className="py-2 px-4 text-left">
                                                        Tasklist
                                                    </th>
                                                    <th className="py-2 px-4 text-left">
                                                        Description
                                                    </th>
                                                    <th className="py-2 px-4 text-left">
                                                        Deadline
                                                    </th>
                                                    <th className="py-2 px-4 text-left">
                                                        Status
                                                    </th>
                                                    <th className="py-2 px-4 text-center">
                                                        Aksi
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tasks.map((task, index) => (
                                                    <tr
                                                        key={task.id}
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="py-2 px-2 text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td className="py-2 px-4">
                                                            {task.title}
                                                        </td>
                                                        <td className="py-2 px-4">
                                                            {task.description}
                                                        </td>
                                                        <td className="py-2 px-4">
                                                            {format(
                                                                new Date(
                                                                    task.deadline
                                                                ),
                                                                "dd MMMM yyyy",
                                                                { locale: id }
                                                            )}
                                                        </td>
                                                        <td className="py-2 px-4 capitalize">
                                                            {task.status}
                                                        </td>
                                                        <td className="py-2 px-4 text-center">
                                                            <Dropdown>
                                                                <Dropdown.Trigger>
                                                                    <span className="inline-flex rounded-md">
                                                                        <button
                                                                            type="button"
                                                                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                                        >
                                                                            <i className="bi bi-three-dots"></i>
                                                                        </button>
                                                                    </span>
                                                                </Dropdown.Trigger>
                                                                <Dropdown.Content>
                                                                    <Dropdown.Button
                                                                        onClick={() =>
                                                                            handleChangeStatus(
                                                                                "pending",
                                                                                task.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Ubah ke
                                                                        Pending
                                                                    </Dropdown.Button>
                                                                    <Dropdown.Button
                                                                        onClick={() =>
                                                                            handleChangeStatus(
                                                                                "in-progress",
                                                                                task.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Ubah ke
                                                                        In
                                                                        Progress
                                                                    </Dropdown.Button>
                                                                    <Dropdown.Button
                                                                        onClick={() =>
                                                                            handleChangeStatus(
                                                                                "completed",
                                                                                task.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Ubah ke
                                                                        Completed
                                                                    </Dropdown.Button>
                                                                    <Dropdown.Button
                                                                        onClick={() =>
                                                                            openModal(
                                                                                task
                                                                            )
                                                                        }
                                                                    >
                                                                        Edit
                                                                    </Dropdown.Button>
                                                                    <Dropdown.Button
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                task.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </Dropdown.Button>
                                                                </Dropdown.Content>
                                                            </Dropdown>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="p-4 bg-gray-100 rounded shadow-sm">
                                        No tasks available
                                    </div>
                                )}
                                {/* Enhanced Pagination */}
                                <div className="mt-4 flex justify-end">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}

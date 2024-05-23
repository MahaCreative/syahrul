import Authenticated from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import { Delete, Edit } from "@mui/icons-material";
import { Modal, Tooltip } from "@mui/material";
import { width } from "@mui/system";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import Form from "./Form";

export default function Index(props) {
    const profile = props.profile;
    const columns = [
        {
            name: "#",
            selector: (row, key) => key + 1,
            width: "60px",
            wrap: true,
        },
        {
            name: "Foto User",
            selector: (row) => (
                <img
                    src={"/storage/" + row.foto}
                    alt=""
                    className="w-[75px] h-[75px] rounded-full"
                />
            ),
            width: "100px",
            wrap: true,
        },
        {
            name: "Nama User",
            selector: (row) => row.first_name + " " + row.last_name,
            wrap: true,
        },

        {
            name: "Email",
            selector: (row) => row.user.email,
            wrap: true,
        },
        {
            name: "Telp",
            selector: (row) => row.no_telp,
            wrap: true,
        },
        {
            name: "Alamat",
            selector: (row) => row.alamat,
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex flex-col md:flex-row gap-1">
                    <button
                        onClick={() => editHandler(row)}
                        className="py-1 px-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out text-xs"
                    >
                        <Tooltip title={`Edit ${row.first_name}`}>
                            <Edit color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                    <button
                        onClick={() => deleteHandler(row)}
                        className="py-1 px-2 rounded-md bg-red-500 text-white hover:bg-red-700 transition-all duration-300 ease-in-out text-xs"
                    >
                        <Tooltip title={`Delete ${row.first_name}`}>
                            <Delete color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </div>
            ),
        },
    ];
    const [modal, setModal] = useState(false);
    const [model, setModel] = useState(null);
    const editHandler = (row) => {
        setModel(row);
        setModal(true);
    };
    const deleteHandler = (row) => {
        Swal.fire({
            title: `Hapus ${row.first_name}`,
            text: `Apakah anda ingin menghapus ${row.first_name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "orange",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus User",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("delete.kelola_admin", { id: row.id }), {
                    onError: (errors) => {
                        Swal.fire({
                            position: "center",
                            title: "Error",
                            text: "Gagal menghapus user",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil menghapus user",
                            icon: "success",
                            timer: 1500,
                        });
                    },
                    preserveScroll: true,
                });
            } else if (result.dismiss) {
            }
        });
    };
    return (
        <div className="w-full px-8 md:px-16 lg:px-24 transition-all duration-300 ease-in-out py-6 relative z-[999]">
            <Modal open={modal} onClose={setModal} style={{ zIndex: 999 }}>
                <Form onClose={setModal} model={model} setModel={setModel} />
            </Modal>
            <div className="my-3 ">
                <button
                    onClick={() => {
                        setModal(true);
                        setModel(null);
                    }}
                    className="py-2 px-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out text-xs"
                >
                    Tambah User
                </button>
            </div>
            <div className="py-2 px-4 w-full text-black">
                <DataTable
                    dense
                    highlightOnHover
                    pagination
                    data={profile}
                    columns={columns}
                />
            </div>
        </div>
    );
}

Index.layout = (page) => <Authenticated children={page} title="Kelola User" />;

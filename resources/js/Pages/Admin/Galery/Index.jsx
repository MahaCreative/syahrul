import { Modal, Tooltip } from "@mui/material";
import React, { useState } from "react";
import Form from "./Form";
import DataTable from "react-data-table-component";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Delete, Edit } from "@mui/icons-material";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import moment from "moment";

export default function Index(props) {
    const galery = props.galery;
    const [model, setModel] = useState(null);
    const [modal, setModal] = useState(false);
    const columns = [
        {
            name: "#",
            selector: (row, key) => key + 1,
            width: "60px",
            wrap: true,
        },
        {
            name: "Foto",
            selector: (row) => (
                <a target="_blank" href={"/storage/" + row.foto}>
                    <img
                        src={"/storage/" + row.foto}
                        alt=""
                        className="w-[75px] h-[75px] rounded-full"
                    />
                </a>
            ),
            width: "100px",
            wrap: true,
        },
        {
            name: "Nama Pelanggan",
            selector: (row) => row.nama_pelanggan,

            wrap: true,
        },
        {
            name: "Tanggal Pemotretan",
            selector: (row) => moment(row.tanggal_foto).format("DD-MMMM-YYYY"),

            wrap: true,
        },
        {
            name: "Taken By",
            selector: (row) => row.taken_by,
            wrap: true,
        },
        {
            name: "Deskripsi",
            selector: (row) => <p className="line-clamp-2">{row.deskripsi}</p>,
            wrap: true,
            width: "200px",
        },

        {
            name: "Created_at",
            selector: (row) =>
                moment(row.created_at).subtract(1, "hour").fromNow(),
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
                        <Tooltip title={`Delete ${row.nama_pelanggan}`}>
                            <Delete color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </div>
            ),
        },
    ];
    const editHandler = (row) => {
        setModel(row);
        setModal(true);
    };
    const deleteHandler = (row) => {
        Swal.fire({
            title: `Hapus Galery ${row.nama_pelanggan}`,
            text: `Apakah anda ingin menghapus Galery ${row.nama_pelanggan}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "orange",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus Galery",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("delete.kelola_galery", { id: row.id }), {
                    onError: (errors) => {
                        Swal.fire({
                            position: "center",
                            title: "Error",
                            text: "Gagal menghapus galery",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil menghapus galery",
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
        <div className="w-full px-4 md:px-8 lg:px-16 transition-all duration-300 ease-in-out py-6 relative z-[999]">
            <Modal
                open={modal}
                onClose={() => {
                    setModal(false);
                    setModel(null);
                }}
                style={{ zIndex: 999 }}
            >
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
                    Tambah Galery
                </button>
            </div>
            <div className="py-2 px-4 w-full text-black">
                <DataTable
                    dense
                    highlightOnHover
                    pagination
                    data={galery}
                    columns={columns}
                />
            </div>
        </div>
    );
}
Index.layout = (page) => (
    <Authenticated children={page} title="Kelola Galery" />
);

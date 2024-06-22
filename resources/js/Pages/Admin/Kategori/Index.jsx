import InputText from "@/Components/InputText";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";
import { Delete } from "@mui/icons-material";
import { Tooltip } from "antd";
import React from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export default function Index({ kategori }) {
    const { data, setData, post, reset, errors } = useForm({
        nama_kategori: "",
    });
    const columns = [
        {
            name: "#",
            selector: (row, key) => key + 1,
            width: "60px",
            wrap: true,
        },
        {
            name: "Nama Kategori",
            selector: (row, key) => row.nama_kategori,
            width: "300px",
            wrap: true,
        },
        {
            name: "Jumlah Paket",
            selector: (row, key) => row.paket_count + " Paket ",
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex flex-col md:flex-row gap-1">
                    <button
                        onClick={() => deleteHandler(row)}
                        className="py-1 px-2 rounded-md bg-red-500 text-white hover:bg-red-700 transition-all duration-300 ease-in-out text-xs"
                    >
                        <Tooltip title={`Delete ${row.nama_kategori}`}>
                            <Delete color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </div>
            ),
        },
    ];
    const deleteHandler = (row) => {
        Swal.fire({
            title: `Hapus Galery ${row.nama_kategori}`,
            text: `Apakah anda ingin menghapus Galery ${row.nama_kategori}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "orange",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus Galery",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("delete.kelola-kategori", { id: row.id }), {
                    onError: (errors) => {
                        Swal.fire({
                            position: "center",
                            title: "Error",
                            text: "Gagal menghapus kategori",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil menghapus kategori",
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
    const tambahKategori = () => {
        Swal.fire({
            title: `Tambah Kategori`,
            text: `Apakah anda ingin menambah 1 kategori baru `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "orange",
            cancelButtonColor: "#d33",
            confirmButtonText: "Tambah Kategori",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("admin.store-kelola-kategori"), {
                    onError: (errors) => {
                        Swal.fire({
                            position: "center",
                            title: "Error",
                            text: "Gagal menambah kategori",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil menambah kategori",
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
            <div className="my-3 flex items-center gap-3">
                <InputText
                    name={"nama_kategori"}
                    title={"Nama Kategori"}
                    value={data.nama_kategori}
                    onChange={(e) =>
                        setData({ ...setData, nama_kategori: e.target.value })
                    }
                    errors={errors.nama_kategori}
                />
                <button
                    onClick={() => tambahKategori()}
                    className="py-4 px-2 rounded-md text-lg bg-blue-500 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out"
                >
                    Tambah Kategori
                </button>
            </div>
            <DataTable data={kategori} columns={columns} />
        </div>
    );
}

Index.layout = (page) => (
    <Authenticated children={page} title="Kelola Kategori" />
);

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Modal, Tooltip } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import Form from "./Form";

export default function Index(props) {
    const paket = props.paket;
    const [modal, setModal] = useState(false);
    const [model, setModel] = useState(null);
    const columns = [
        {
            name: "#",
            selector: (row, key) => key + 1,
            width: "60px",
            wrap: true,
        },
        {
            name: "Nama Paket",
            selector: (row) => row.nama_paket,
            wrap: true,
        },
        {
            name: "Lokasi Foto",
            selector: (row) => row.lokasi_foto,
            wrap: true,
            width: "110px",
        },
        {
            name: "Deskripsi Paket",
            selector: (row) => (
                <p className="line-clamp-2">{row.deskripsi_paket}</p>
            ),
            wrap: true,
        },
        {
            name: "Harga Paket",
            selector: (row) => (
                <CurrencyInput
                    disabled
                    value={row.harga_paket}
                    prefix="Rp. "
                    className="bg-inherit border-none font-semibold"
                />
            ),
            wrap: true,
            width: "160px",
        },
        {
            name: "Jumlah Pesanan Bulan Ini",
            selector: (row) => row.jumlah_pesanan + " Pesanan Di Terima",
            wrap: true,
            width: "180px",
        },
        {
            name: "Status Pemesanan",
            selector: (row) =>
                row.aktif_paket == 1
                    ? "Dapat di pesan"
                    : "tidak dapat di pesan",
            wrap: true,
        },
        {
            name: "Status Pemesanan",
            selector: (row) =>
                moment(row.created_at).subtract(1, "hour").fromNow(),
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex flex-col md:flex-row gap-1">
                    <Link
                        as="button"
                        href={route("admin.show_paket", row.id)}
                        className="py-1 px-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out text-xs"
                    >
                        <Tooltip title={`Show ${row.nama_paket}`}>
                            <Visibility color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </Link>
                    <button
                        onClick={() => editHandler(row)}
                        className="py-1 px-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition-all duration-300 ease-in-out text-xs"
                    >
                        <Tooltip title={`Edit ${row.nama_paket}`}>
                            <Edit color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                    <button
                        onClick={() => deleteHandler(row)}
                        className="py-1 px-2 rounded-md bg-red-500 text-white hover:bg-red-700 transition-all duration-300 ease-in-out text-xs"
                    >
                        <Tooltip title={`Delete ${row.nama_paket}`}>
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
            title: `Hapus ${row.nama_paket}`,
            text: `Apakah anda ingin menghapus ${row.nama_paket} Menghapus paket dapat menghilangkan juga data terkait didalamnya termasuk jadwal dan juga pesanan pelanggan.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "orange",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus paket",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(
                    route("delete.kelola_paket_booking", { id: row.id }),
                    {
                        onError: (errors) => {
                            Swal.fire({
                                position: "center",
                                title: "Error",
                                text: "Gagal menghapus paket",
                                icon: "error",
                                timer: 1500,
                            });
                        },
                        onSuccess: () => {
                            Swal.fire({
                                position: "center",
                                title: "Sukses",
                                text: "Berhasil menghapus paket",
                                icon: "success",
                                timer: 1500,
                            });
                        },
                        preserveScroll: true,
                    }
                );
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
            <div className="my-3 px-4">
                <button
                    onClick={() => {
                        setModal(true);
                        setModel(null);
                    }}
                    className="py-2 px-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out text-xs"
                >
                    Tambah Slider
                </button>
            </div>
            <div className="py-2 px-4 w-full text-black">
                {paket.length > 0 ? (
                    <DataTable
                        dense
                        highlightOnHover
                        pagination
                        data={paket}
                        columns={columns}
                    />
                ) : (
                    <div className="w-full h-full flex justify-center ">
                        <div className="text-center">
                            <h3 className="text-orange-500 font-bold text-xl md:text-3xl">
                                Uppss. Belum Ada Paket
                            </h3>
                            <p>
                                Silahkan menambahkan paket baru pada tombol
                                dibawah ini
                            </p>
                            <button
                                onClick={() => setModal(true)}
                                className="my-7 bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 font-bold"
                            >
                                Tambah Paket
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
Index.layout = (page) => <Authenticated children={page} title="Kelola Paket" />;

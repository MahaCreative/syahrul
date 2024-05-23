import InputText from "@/Components/InputText";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import { Modal } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export default function List(props) {
    const detail = props.detail;
    const columns = [
        {
            name: "#",
            selector: (row, key) => key + 1,
            width: "60px",
            wrap: true,
        },
        {
            name: "Kode Pesanan",
            selector: (row) => row.pesanan.kd_pesanan,
            wrap: true,
        },
        {
            name: "Tanggal di pesan",
            selector: (row) =>
                moment(row.pesanan.tgl_pesanan).format("DD-MMMM-YYYY"),
            wrap: true,
        },
        {
            name: "Nama Paket",
            selector: (row) => row.paket.nama_paket,
            wrap: true,
        },
        {
            name: "Status Pembayaran",
            selector: (row) => row.pesanan.status_pembayaran,
            wrap: true,
        },
        {
            name: "Tanggal pembayaran",
            selector: (row) =>
                moment(row.pesanan.tanggal_pembayaran).format("DD-MMMM-YYYY"),
            wrap: true,
        },
        {
            name: "Waktu Rencana",
            selector: (row) =>
                moment(row.tanggal_foto).format("DD-MMMM-YYYY") +
                "" +
                row.jam_foto,
            wrap: true,
        },
        {
            name: "Status Pesanan",
            selector: (row) => row.status_pesanan_paket,
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <button
                    onClick={() => konfirmasiPesanan(row)}
                    className="bg-blue-500 font-bold py-2 px-4 text-white"
                >
                    Konfirmasi
                </button>
            ),
            wrap: true,
        },
    ];
    const [modalKonfirmasi, setModalKonfirmasi] = useState(false);
    const [modelKonfirm, setModelKonfi] = useState(null);
    const [statusTolak, setStatusTolak] = useState(false);
    const [paramsKonfirm, setParamsKonfirm] = useState({
        status: "",
        catatan: "",
    });
    const konfirmasiPesanan = (row) => {
        setModalKonfirmasi(true);
        setModelKonfi(row);
    };
    const konfirmHandler = (status) => {
        setParamsKonfirm({ ...paramsKonfirm, status: status });

        if (status == "di tolak") {
            setStatusTolak(true);
        } else {
            setStatusTolak(false);

            Swal.fire({
                title: "Konfirmasi Pesanan",
                text: `Apakah pesanan pelanggan ini diterima?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya Diterima",
                cancelButtonText: "Batalkan Konfirmasi",
                allowOutsideClick: false,
                zIndex: 9999,
            }).then((result) => {
                if (result.isConfirmed) {
                    router.post(
                        route("create.konfirmasi-pesanan-paket-booking"),
                        { modelKonfirm, paramsKonfirm },
                        {
                            onError: (err) => {
                                Swal.fire({
                                    position: "center",
                                    title: "Gagal mengkonfirmasi pesanan",
                                    text: "Periksa form isian anda, mungkin terdapat kesalahan pada isian anda?",
                                    icon: "error",
                                    timer: 1500,
                                });
                            },
                            onSuccess: () => {
                                Swal.fire({
                                    position: "center",
                                    title: "Sukses",
                                    text: "Berhasil mengkonfirmasi pesanan",
                                    icon: "success",
                                    timer: 1500,
                                });
                                reset();
                                onClose(false);
                                setModel(null);
                            },
                            preserveScroll: true,
                        }
                    );
                } else {
                    onClose(false);
                }
            });
        }
    };
    const kirimCatatnPenolakan = (e) => {
        e.preventDefault();
        console.log(status);
        Swal.fire({
            title: "Konfirmasi Pesanan",
            text: `Apakah pesanan pelanggan ini ditolak?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya Ditolak",
            cancelButtonText: "Batalkan Konfirmasi",
            allowOutsideClick: false,
            zIndex: 9999,
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    route("create.konfirmasi-pesanan-paket-booking"),
                    { modelKonfirm, paramsKonfirm },
                    {
                        onError: (err) => {
                            Swal.fire({
                                position: "center",
                                title: "Gagal mengkonfirmasi pesanan",
                                text: err.error,
                                icon: "error",
                                timer: 1500,
                            });
                            console.log(err);
                        },
                        onSuccess: () => {
                            Swal.fire({
                                position: "center",
                                title: "Sukses",
                                text: "Berhasil mengkonfirmasi pesanan",
                                icon: "success",
                                timer: 1500,
                            });
                            reset();
                            onClose(false);
                            setModel(null);
                        },
                        preserveScroll: true,
                    }
                );
            } else {
                onClose(false);
            }
        });
    };
    return (
        <div className="w-full px-4 md:px-8 lg:px-16 transition-all duration-300 ease-in-out py-6 relative z-[999]">
            <Modal
                style={{ zIndex: 999 }}
                open={modalKonfirmasi}
                onClose={() => {
                    setModalKonfirmasi(false);
                    setModelKonfi(null);
                }}
            >
                <div className="px-8 md:px-16 lg:px-24 w-full h-full flex overflow-y-auto justify-center items-center">
                    <div className="w-1/2 bg-white py-6 px-4 rounded-md  max-h-[90vh] overflow-y-auto">
                        <h3 className="font-bold text-orange-500 text-base md:text-lg lg:text-xl ">
                            Konfirmasi Pesanan{" "}
                            {modelKonfirm?.pesanan.kd_pesanan}
                        </h3>
                        <p>
                            Silahkan melakukan konfirmasi pesanan pelanggan,
                            jika pesanan pada paket ini diterima silahkan
                            menekan tombol terima. Pesanan yang statusnya di
                            tolak akan membuat pelanggan tidak dapat melakukan
                            pembayaran. Jika pembayaran di tolak Sertakan alasan
                            mengapa pesanannya ditolak
                        </p>
                        <div className="flex py-3 gap-3">
                            <button
                                onClick={() => konfirmHandler("di tolak")}
                                className="bg-red-500 hover:bg-red-500 transition-all duration-300 ease-in-out py-2 px-3 font-bold text-white"
                            >
                                Pesanan Di Tolak
                            </button>
                            <button
                                onClick={() => konfirmHandler("di terima")}
                                className="bg-green-500 hover:bg-green-500 transition-all duration-300 ease-in-out py-2 px-3 font-bold text-white"
                            >
                                Pesanan Di Terima
                            </button>
                            <button
                                onClick={() => {
                                    setModalKonfirmasi(false);
                                    setModelKonfi(null);
                                }}
                                className="bg-red-500 hover:bg-red-500 transition-all duration-300 ease-in-out py-2 px-3 font-bold text-white"
                            >
                                Batalkan konfrimasi
                            </button>
                        </div>
                        {statusTolak && (
                            <form
                                onSubmit={kirimCatatnPenolakan}
                                className="my-3 w-full"
                            >
                                <p className="text-xs text-red-500 italic">
                                    *Penolakan Pesanan wajib disertai dengan
                                    alasan kenapa pesanan ditolak. dan berikan
                                    solusi agar pesanan dapat di terima
                                </p>
                                <InputText
                                    onChange={(e) =>
                                        setParamsKonfirm({
                                            ...paramsKonfirm,
                                            catatan: e.target.value,
                                        })
                                    }
                                    title={"Catatan Penolakan"}
                                    className="w-full"
                                />
                                <button className="mt-3 bg-blue-500 hover:bg-blue-500 transition-all duration-300 ease-in-out py-2 px-3 font-bold text-white">
                                    Kirim Catatan penolakan
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </Modal>
            <h3 className="font-bold text-orange-500 text-base md:text-lg lg:text-xl ">
                List Paket Pesanan Pelanggan
            </h3>
            <p className="font-light text-xs italic">
                Daftar Pesanan Paket Pada Bulan Ini
            </p>
            <div>
                <DataTable
                    dense
                    highlightOnHover
                    pagination
                    data={detail}
                    columns={columns}
                />
            </div>
        </div>
    );
}

List.layout = (page) => (
    <Authenticated children={page} title="Daftar Paket Pesanan Pelanggan" />
);

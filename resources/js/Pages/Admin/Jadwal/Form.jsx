import InputText from "@/Components/InputText";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import { debounce } from "@mui/material";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export default function Form({ model, setModel, onClose, detail }) {
    const [formData, setFormData] = useState([]);
    const [data, setData] = useState({
        kd_pesanan: "",
        nama_paket: "",
        judul_jadwal: "",
        nama_pelanggan: "",
        kontak_pelanggan: "",
        lokasi: "",
        tanggal_foto: "",
        jam_foto: "",
        catatan: "",
    });
    const [dataPesanan, setDataPesanan] = useState(null);

    const [params, setParams] = useState({
        cari: "",
    });
    const reload = useCallback(
        debounce((query) => {
            router.get(route("admin.create-kelola-jadwal"), query, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
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
            name: "Nama paket",
            selector: (row) => row.paket.nama_paket,

            wrap: true,
        },
        {
            name: "Jadwal Pemotretan",
            selector: (row) =>
                moment(row.tanggal_foto).format("DD-MMMM-YYYY") +
                " " +
                row.jam_foto,
            wrap: true,
        },
        {
            name: "Lokasi",
            selector: (row) => row.paket.lokasi_foto,
            wrap: true,
        },
        {
            name: "Nama Pelanggan",
            selector: (row) => row.pesanan.user.name,
            wrap: true,
        },
        {
            name: "Catatan",
            selector: (row) => row.catatan,
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <button
                    onClick={() => tambah(row)}
                    className="py-2 px-3 font-bold bg-blue-500 text-white"
                >
                    Buat Jadwal
                </button>
            ),
            wrap: true,
        },
    ];
    const columnsData = [
        {
            name: "#",
            selector: (row, key) => key + 1,
            width: "60px",
            wrap: true,
        },
        {
            name: "Judul Jadwal",
            selector: (row) => row.judul_jadwal,

            wrap: true,
        },
        {
            name: "Kode Pesanan",
            selector: (row) => row.kd_pesanan,
            wrap: true,
        },

        {
            name: "Nama paket",
            selector: (row) => row.nama_paket,

            wrap: true,
        },
        {
            name: "Jadwal Pemotretan",
            selector: (row) =>
                moment(row.tanggal_foto).format("DD-MMMM-YYYY") +
                " " +
                row.jam_foto,
            wrap: true,
        },
        {
            name: "Lokasi",
            selector: (row) => row.lokasi,
            wrap: true,
        },
        {
            name: "Nama Pelanggan",
            selector: (row) => row.nama_pelanggan,
            wrap: true,
        },
        {
            name: "Catatan",
            selector: (row) => row.catatan,
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row, index) => (
                <button
                    onClick={() => remove(row, index)}
                    className="py-2 px-3 font-bold bg-red-500 text-white"
                >
                    Hapus
                </button>
            ),
            wrap: true,
        },
    ];
    const remove = (row, index) => {
        const newDataList = formData.filter((item, i) => i !== index);
        setFormData(newDataList);
    };
    const tambah = (row) => {
        setData({
            ...data,
            kd_pesanan: row.pesanan.kd_pesanan,
            nama_paket: row.paket.nama_paket,
            judul_jadwal: "",
            nama_pelanggan: row.pesanan.user.name,
            kontak_pelanggan: row.pesanan.user.pelanggan.no_telp,
            lokasi:
                row.paket.lokasi_foto == "studio" ? row.paket.lokasi_foto : "",
            tanggal_foto: row.tanggal_foto,
            jam_foto: row.jam_foto,
            catatan: row.catatan,
        });
    };
    const tambahData = () => {
        setFormData([...formData, data]);
        setData({
            ...data,
            kd_pesanan: "",
            nama_paket: "",
            judul_jadwal: "",
            nama_pelanggan: "",
            kontak_pelanggan: "",
            lokasi: "",
            tanggal_foto: "",
            jam_foto: "",
            catatan: "",
        });
    };

    const submitJadwal = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Buat Jadwal",
            text: `Anda akan membuat ${formData.length} Jadwal`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya Buat Jadwal",
            allowOutsideClick: false,
            zIndex: 9999,
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    route("admin.store-jadwal"),
                    { data: formData },
                    {
                        onError: (err) => {
                            console.log(err);
                            Swal.fire({
                                position: "center",
                                title: "Gagal menambahkan jadwal",
                                text: err.message,
                                icon: "error",
                                timer: 1500,
                            });
                        },
                        onSuccess: () => {
                            Swal.fire({
                                position: "center",
                                title: "Sukses",
                                text: "Berhasil Menambah Jadwal",
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
            <div className="">
                <div className="w-full">
                    <DataTable
                        data={detail}
                        pagination
                        dense
                        highlightOnHover
                        columns={columns}
                    />
                </div>
                <div className="flex justify-between items-start gap-3 flex-col md:flex-row">
                    <div className="w-full">
                        <h3 className="font-bold text-orange-500 text-base md:text-lg lg:text-xl ">
                            Form Jadwal
                        </h3>
                        <p>
                            Silahkan memilih pesanan pelanggan yang akan
                            dibuatkan jadwal
                        </p>
                        <form className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
                            <InputText
                                required
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        judul_jadwal: e.target.value,
                                    })
                                }
                                label={"Judul Jadwal"}
                                value={data.judul_jadwal}
                                className="w-full"
                            />
                            <InputText
                                required
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        lokasi: e.target.value,
                                    })
                                }
                                label={"Lokasi Pemotretan"}
                                value={data.lokasi}
                                className="w-full"
                            />
                            <InputText
                                required
                                disabled
                                label={"Kode Pesanan"}
                                value={data.kd_pesanan}
                                className="w-full"
                            />
                            <InputText
                                disabled
                                label={"Nama Paket Pesanan"}
                                value={data.nama_paket}
                                className="w-full"
                            />
                            <InputText
                                disabled
                                label={"Nama Pelanggan"}
                                value={data.nama_pelanggan}
                                className="w-full"
                            />
                            <InputText
                                disabled
                                label={"Nama Pelanggan"}
                                value={data.kontak_pelanggan}
                                className="w-full"
                            />

                            <InputText
                                disabled
                                label={"Tanggal Foto"}
                                value={data.tanggal_foto}
                                className="w-full"
                            />
                            <InputText
                                disabled
                                label={"Jam Foto"}
                                value={data.jam_foto}
                                className="w-full"
                            />
                            <InputText
                                disabled
                                label={"Catatan"}
                                value={data.catatan}
                                className="w-full col-span-3"
                            />
                            <div>
                                <button
                                    type="button"
                                    onClick={tambahData}
                                    className="my-3 bg-blue-500 font-bold text-white py-2 px-4"
                                >
                                    Tambah Jadwal
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="w-full">
                        <DataTable data={formData} columns={columnsData} />
                        {formData.length > 0 && (
                            <button
                                onClick={submitJadwal}
                                className="bg-blue-500 py-2 px-4 font-bold text-white my-3"
                            >
                                Buat Keseluruhan Jadwal
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

Form.layout = (page) => (
    <Authenticated children={page} title="Buat Jadwal Baru" />
);

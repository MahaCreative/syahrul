import Guest from "@/Layouts/GuestLayout";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Dialog, Input } from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import CurrencyInput from "react-currency-input-field";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export default function Show(props) {
    const detail = props.detail;
    const paymentRef = useRef(null);
    const [showPayment, setShowPayment] = useState(false);
    const pesanan = props.pesanan;
    const [token, setToken] = useState([null]);
    const { studio } = usePage().props;
    const columns = [
        {
            name: "#",
            width: "60px",
            wrap: true,
            selector: (row, index) => index + 1,
        },
        {
            name: "Foto Paket",
            wrap: true,
            width: "130px",
            selector: (row) => (
                <img
                    src={"/storage/" + row.paket.gambar_paket}
                    alt=""
                    className="w-[90px] object-cover"
                />
            ),
        },
        {
            name: "Nama Paket",
            wrap: true,
            width: "150px",
            selector: (row) => row.paket.nama_paket,
        },
        {
            name: "Deskripsi Paket",
            wrap: true,
            width: "150px",
            selector: (row) => (
                <div>
                    <p>{row.paket.deskripsi_paket}</p>
                    <p className="text-orange-500 font-bold">
                        {row.paket.catatan_paket}
                    </p>
                </div>
            ),
        },
        {
            name: "Harga Paket",
            wrap: true,
            width: "150px",
            selector: (row) => (
                <CurrencyInput
                    prefix="Rp. "
                    value={row.paket.harga_paket}
                    className="bg-none border-none"
                    disabled
                />
            ),
        },
        {
            name: "Waktu Booking",
            wrap: true,
            width: "130px",
            selector: (row) => moment(row.tanggal_foto).format("DD-MMMM-YYYY"),
        },
        {
            name: "Jam Foto",
            wrap: true,
            width: "100px",
            selector: (row) => row.jam_foto,
        },
        {
            name: "Catatan",
            wrap: true,
            width: "120px",
            selector: (row) => row.catatan,
        },
        {
            name: "Status Pesanan Paket",
            wrap: true,
            width: "120px",
            selector: (row) => (
                <p
                    className={`${
                        row.status_pesanan_paket == "di tolak"
                            ? "text-red-500"
                            : row.status_pesanan_paket == "menunggu konfirmasi"
                            ? "text-orange-500"
                            : "text-green-500"
                    }`}
                >
                    {row.status_pesanan_paket}
                </p>
            ),
        },
        {
            name: "Aksi",

            selector: (row) =>
                pesanan.status_pemesanan === "di batalkan" ||
                pesanan.status_pemesanan == "selesai" ? (
                    ""
                ) : (
                    <>
                        {pesanan.status_pembayaran == "belum lunas" && (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => deleteHandler(row)}
                                    className="text-white py-1 px-3 bg-red-500"
                                >
                                    Hapus
                                </button>
                                <button
                                    onClick={() => editHandler(row)}
                                    className="text-white py-1 px-3 bg-orange-500"
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </>
                ),
        },
    ];

    const deleteHandler = (row) => {
        Swal.fire({
            title: "Hapus Paket " + row.paket.nama_paket,
            text: "Apakah anda ingin menghapus paket ini",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "orange",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya Hapus Paket",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    route("remove_cart"),
                    { id: row.id },
                    {
                        onError: (error) => {
                            Swal.fire({
                                position: "center",
                                title: "Error",
                                text: "Ups.. Sayang sekali paket ini gagal dihapus dari pesanan anda.",
                                icon: "error",
                                timer: 1500,
                            });
                        },
                        onSuccess: () => {
                            Swal.fire({
                                position: "center",
                                title: "Success",
                                text: "Paket berhasil dihapus",
                                icon: "success",
                                timer: 1500,
                            });
                        },
                        preserveScroll: true,
                    }
                );
            }
        });
    };
    const batalKanPesanan = (row) => {
        Swal.fire({
            title: "Batalkan Pesanan " + pesanan.kd_pesanan,
            text: "Apakah anda ingin membatalkan pesanan anda",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "orange",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya Batalkan Pesanan",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    route("cancell_pesanan"),
                    { kd_pesanan: row.kd_pesanan },
                    {
                        onError: (error) => {
                            Swal.fire({
                                position: "center",
                                title: "Error",
                                text: "Upss, gagal membatalkan pesanan anda",
                                icon: "error",
                                timer: 3000,
                            });
                        },
                        onSuccess: () => {
                            Swal.fire({
                                position: "center",
                                title: "Success",
                                text: "Ups, sayang sekali anda telah berhasil membatalkan pesanan, kami tunggu pesanan anda selanjutnya.",
                                icon: "success",
                                timer: 1500,
                            });
                        },
                        preserveScroll: true,
                    }
                );
            }
        });
    };
    const [modalPayment, setModalPayment] = useState(false);

    const [model, setModel] = useState([null]);
    const [modalForm, setModalForm] = useState(false);
    const { data, setData, post, reset, errors } = useForm({
        tanggal_foto: new Date(),
        paket_id: "",
        jam_foto: "",
        catatan: "",
    });
    const editHandler = (row) => {
        setModel(row);
        setData({
            ...data,
            id: row.id,
            tanggal_foto: row.tanggal_foto,
            jam_foto: row.jam_foto,
            catatan: row.catatan,
        });
        setModalForm(true);
    };

    const submitPesanan = (e) => {
        e.preventDefault();

        setModalForm(false);
        Swal.fire({
            title: `Edit Booking ${model.nama_paket}`,
            text: `Apakah anda ingin mengedit booking paket ${
                model.nama_paket
            } pada Tanggal ${moment(data.tanggal_foto).format("d-m-Y")} Jam : ${
                data.jam_foto
            }`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "orange",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ubah Booking",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("edit_cart"), {
                    onError: (errors) => {
                        Swal.fire({
                            position: "center",
                            title: "Gagal melakukan edit booking",
                            text: errors.message
                                ? errors.message
                                : "Terdapat kesalahan saat melakukan edit booking, silahkan cek isian anda",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil mengedit booking pesanan",
                            icon: "success",
                            timer: 1500,
                        });
                    },
                    preserveScroll: true,
                });
            } else if (result.dismiss) {
                setModalForm(true);
            }
        });
    };

    const checkout = (row) => {
        const params = new URLSearchParams({
            kd_pesanan: pesanan.kd_pesanan,
        });
        setShowPayment(true);

        fetch("/api/get-token/?" + params.toString())
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Network response was not ok " + response.statusText
                    );
                }
                return response.json();
            })
            .then((data) => {
                paymentRef.current.scrollIntoView({ behavior: "smooth" });
                setShowPayment(true);
                window.snap.embed(data, {
                    embedId: "snap-container",
                    onSuccess: function (result) {
                        /* You may add your own implementation here */
                        Swal.fire({
                            title: "Payment Success",
                            text: "Sukses melakukan pembayaran, apakah anda ingin melihat Invoice Anda",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "orange",
                            confirmButtonText: "Lihat Invoice",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setTimeout(() => {
                                    router.visit(
                                        route(
                                            "invoice_pesanan",
                                            pesanan.kd_pesanan
                                        )
                                    );
                                }, 1500);
                            }
                        });
                    },
                    onPending: function (result) {
                        /* You may add your own implementation here */
                        setShowPayment(false);
                        Swal.fire({
                            title:
                                "Silahkan melakukan Pembayaran Sebelum Tanggal " +
                                moment(pesanan.tgl_pesanan)
                                    .add(2, "days")
                                    .format("DD-MMMM-YYYY"),
                            text: "Apakah anda ingin membatalkan pesanan anda",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "orange",
                        });
                    },
                    onError: function (result) {
                        /* You may add your own implementation here */

                        setShowPayment(false);
                    },
                    onClose: function () {
                        /* You may add your own implementation here */
                        setShowPayment(false);
                    },
                });
            })
            .catch((error) => {});
    };

    return (
        <div className="py-16 px-4 md:px-8 lg:px-16">
            {/* mopdal */}
            <Dialog
                maxWidth={"w-[90vw]"}
                open={modalForm}
                onClose={() => {
                    setModel([null]);
                    setModalForm(false);
                }}
            >
                <div className="bg-white  gap-3 py-8 w-full md:w-[80vw] flex flex-col lg:flex-row  px-4 transition-all duration-300 ease-in-out">
                    <div className="w-full">
                        <h3 className="font-bold text-xl text-orange-500 capitalize tracking-tighter">
                            {model.paket?.nama_paket}
                        </h3>
                        <div className="">
                            <img
                                src={"/storage/" + model.paket?.gambar_paket}
                                className="h-[240px] w-full object-cover"
                                alt=""
                            />
                            <h3 className="font-medium text-orange-500 text-xl my-3">
                                Keterangan Paket
                            </h3>
                            <p className="text-lg">
                                {model.paket?.deskripsi_paket}
                            </p>
                            <h3 className="font-medium text-orange-500 text-xl my-3">
                                Catatan:
                            </h3>
                            <p className="text-lg">
                                {model.paket?.catatan_paket}
                            </p>
                            <h3 className="font-medium text-orange-500 text-xl my-3">
                                Status Pemesanan Paket
                            </h3>
                            <p
                                className={`${
                                    model.paket?.aktif_paket == 1
                                        ? "text-orange-500"
                                        : "text-orange-500"
                                } text-lg`}
                            >
                                {model.paket?.aktif_paket == 1
                                    ? "Paket Tersedia"
                                    : "Paket Tidak Tersedia Saat Ini"}
                            </p>
                            <div className="my-3">
                                <CurrencyInput
                                    className="text-orange-500 font-semibold text-2xl bg-inherit border-none hover:cursor-default"
                                    disabled={true}
                                    prefix="Rp. "
                                    value={model.paket?.harga_paket}
                                />
                            </div>
                            {model.paket?.aktif_paket == 1 ? (
                                <div className="bg-orange-500 py-2 px-4 text-white rounded-md text-center hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-linear">
                                    Booking Sekarang
                                </div>
                            ) : (
                                <div className="bg-red-500 py-2 px-4 text-white rounded-md text-center hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-linear">
                                    Paket Tidak Dapat Di Pesan Sekarang
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 border-l border-orange-500/40 px-3">
                        <h3 className="font-bold text-xl text-orange-500 capitalize tracking-tighter">
                            Informasi Tanggal Booking
                        </h3>
                        <form
                            onSubmit={submitPesanan}
                            className="flex flex-col gap-3 my-3 w-full"
                        >
                            <div className="w-full bg-white rounded-md overflow-hidden">
                                <p className="my-3 text-base font-light text-orange-500">
                                    Pilih Tanggal Pemotretan
                                </p>
                                <Calendar
                                    className={"w-full block bg-red-200"}
                                    value={data.tanggal_foto}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            tanggal_foto: e,
                                        })
                                    }
                                />
                                {errors && (
                                    <p className="text-red-500 italic text-xs">
                                        {errors.tanggal_foto}
                                    </p>
                                )}
                                <p className="mt-3 text-base font-light text-orange-500">
                                    Pilih Jam Pemotretan
                                </p>
                                <Input
                                    value={data.jam_foto}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            jam_foto: e.target.value,
                                        })
                                    }
                                    type="time"
                                    className="w-full py-1 text-xl block"
                                />
                                {errors && (
                                    <p className="text-red-500 italic text-xs">
                                        {errors.jam_foto}
                                    </p>
                                )}
                                <p className="mt-3 text-base font-light text-orange-500">
                                    Tinggalkan Catatan
                                </p>
                                <Input
                                    value={data.catatan}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            catatan: e.target.value,
                                        })
                                    }
                                    className="w-full py-1 text-xl "
                                />
                            </div>
                            <div className="my-3 flex gap-3">
                                <button className="text-white py-2 px-4 rounded-md bg-orange-500">
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        reset();
                                        setModel([null]);
                                        setModalForm(false);
                                    }}
                                    className="text-white py-2 px-4 rounded-md bg-red-500"
                                >
                                    Cancell
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>
            <div className="my-6">
                <h3 className="text-orange-500 text-center text-4xl font-bold tracking-tighter">
                    Daftar Booking Paket
                </h3>
                <p className="text-white text-center mb-4  text-xl md:text-3xl font-light">
                    {studio.nama_studio + " " + studio.tagline}
                </p>
            </div>
            <div className="rounded-md bg-white py-3 px-4">
                <DataTable data={detail} columns={columns} />
                <div className="flex justify-between items-center">
                    <div className="flex justify-center w-full">
                        <h3 className="text-center text-5xl text-red-500 font-bold">
                            {moment(pesanan.tgl_pesanan)
                                .add(2, "days")
                                .format("DD-MMMM-YYYY")}
                        </h3>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-end w-full gap-4">
                        <div className="text-left md:text-right w-full">
                            <h3 className="text-orange-500 text-sm md:text-base lg:text-xl ">
                                Kode Pesanan : {pesanan.kd_pesanan}
                            </h3>
                            <h3 className="text-md md:text-md font-light ">
                                Tanggal pesanan :{" "}
                                {moment(pesanan.tanggal_pesanan).format(
                                    "DD-MMMM-YYYY"
                                )}
                            </h3>
                            <h3
                                className={`${
                                    pesanan.status_pemesanan == "di batalkan"
                                        ? "text-red-500"
                                        : pesanan.status_pemesanan ==
                                          "belum selesai"
                                        ? ""
                                        : "text-green-500"
                                } text-md md:text-md font-light `}
                            >
                                Status Pesanan : {pesanan.status_pemesanan}
                            </h3>
                            <h3
                                className={`${
                                    pesanan.status_pembayaran == "belum lunas"
                                        ? "text-red-500"
                                        : pesanan.status_pembayaran == "pending"
                                        ? "text-orange-500"
                                        : "text-green-500"
                                } text-md md:text-md font-light `}
                            >
                                Status Pembayaran : {pesanan.status_pembayaran}
                            </h3>
                        </div>
                        <div className="md:w-full w-full">
                            <div className="flex gap-3  border px-2 border-orange-500 bg-orange-500 text-white">
                                <h3>
                                    Total Harga :{" "}
                                    <CurrencyInput
                                        prefix="Rp. "
                                        className="bg-inherit border-none"
                                        value={pesanan.total_pembayaran}
                                        disabled
                                    />
                                </h3>
                            </div>
                            {pesanan.status_pembayaran !== "lunas" && (
                                <div className="my-3">
                                    <button
                                        onClick={() => batalKanPesanan(pesanan)}
                                        className="bg-red-500 text-white py-2 px-4 text-center w-full"
                                    >
                                        Batalkan Pesanan
                                    </button>
                                    {pesanan.aktif_payment == "ya" && (
                                        <button
                                            onClick={() => checkout(pesanan)}
                                            className="bg-blue-500 text-white my-2 py-2 px-4 text-center w-full"
                                        >
                                            Bayar Sekarang
                                        </button>
                                    )}
                                </div>
                            )}
                            {pesanan.status_pembayaran == "lunas" && (
                                <Link
                                    href={route(
                                        "invoice_pesanan",
                                        pesanan.kd_pesanan
                                    )}
                                    as="button"
                                    className="bg-blue-500 text-white py-2 px-4 w-full mt-3"
                                >
                                    Lihat Invoice
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                <div className="px-3 py-2 rounded-md flex flex-col lg:flex-row gap-3 items-start justify-between">
                    {showPayment && (
                        <div>
                            <div
                                ref={paymentRef}
                                id="snap-container"
                                className="w-full"
                            ></div>
                        </div>
                    )}
                    <div className="w-full font-light text-lg lg:text-xl px-8">
                        <h1 className="text-orange-500 font-bold text-xl">
                            Syarat dan Ketentuan
                        </h1>
                        <h3 className="text-orange-500 font-light mb-4">
                            Booking Jasa Foto di Galiph Studio
                        </h3>
                        <p className="">
                            Terima kasih telah memilih Galiph Studio sebagai
                            penyedia jasa fotografi Anda. Berikut adalah
                            informasi penting terkait pemesanan dan pembayaran:
                        </p>
                        <p className="font-bold mt-3">
                            Proses Pemesanan dan Pembayaran:
                        </p>
                        <ul className="px-8">
                            <li className="list-disc">
                                Setelah melakukan pemesanan, Anda diwajibkan
                                untuk menyelesaikan pembayaran dalam waktu
                                maksimal 2 hari.
                            </li>
                            <li className="list-disc">
                                Pembayaran dapat dilakukan melalui metode
                                pembayaran yang tersedia di situs kami.
                            </li>
                        </ul>
                        <p className="font-bold mt-3">Kebijakan Pembatalan:</p>
                        <ul className="px-8">
                            <li className="list-disc">
                                Jika Anda ingin membatalkan pemesanan, Anda
                                harus datang langsung ke Galiph Studio.
                            </li>
                            <li className="list-disc">
                                Harap diperhatikan bahwa untuk setiap
                                pembatalan, kami akan mengenakan potongan
                                sebesar 30% dari jumlah pembayaran yang telah
                                dilakukan.
                            </li>
                        </ul>
                        <p className="mt-3">
                            Kami menghargai kerjasama Anda dalam mengikuti
                            kebijakan ini dan berharap dapat memberikan layanan
                            terbaik untuk kebutuhan fotografi Anda.
                        </p>{" "}
                        <p className="mt-2">
                            Jika Anda memiliki pertanyaan atau memerlukan
                            informasi lebih lanjut, jangan ragu untuk
                            menghubungi kami melalui kontak yang tersedia.
                        </p>
                        <p className="mt-3">Terima kasih.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
Show.layout = (page) => <Guest children={page} title={"Detail Pesanan Saya"} />;

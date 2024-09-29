import { usePage } from "@inertiajs/react";
import moment from "moment";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import DataTable from "react-data-table-component";

export default function CetakPesanan(props) {
    const pesanan = props.pesanan;
    const columns = [
        {
            name: "#",
            width: "60px",
            wrap: "true",
            selector: (row, index) => index + 1,
        },
        {
            name: "Kode Pesanan",
            width: "120px",
            wrap: true,
            selector: (row) => row.kd_pesanan,
        },
        {
            name: "Nama Pemesan",
            width: "120px",
            wrap: true,
            selector: (row) => row.user.name,
        },
        {
            name: "Jumlah Pesanan",
            width: "130px",
            wrap: true,
            selector: (row) => row.detail_pesanan_count + " Paket di pesan",
        },
        {
            name: "Tanggal Pesanan",
            width: "120px",
            wrap: true,
            selector: (row) => moment(row.tgl_pesanan).format("DD-MMMM-YYYY"),
        },

        {
            name: "Total Pembayaran",
            wrap: true,
            width: "150px",
            selector: (row) => (
                <CurrencyInput
                    value={row.total_pembayaran}
                    className="border-none"
                    disabled
                    prefix="Rp. "
                />
            ),
        },
        {
            name: "Status Pembayaran",
            wrap: true,
            width: "130px",
            selector: (row) => row.status_pembayaran,
        },
        {
            name: "Status Pemesanan",
            wrap: true,
            selector: (row) => row.status_pemesanan,
        },
        {
            name: "Bukti Pembayaran",
            wrap: true,
            selector: (row) =>
                row.invoice?.bukti_pembayaran && (
                    <>
                        <a
                            href={"/storage/" + row.invoice.bukti_pembayaran}
                            target="_blank"
                        >
                            <img
                                src={"/storage/" + row.invoice.bukti_pembayaran}
                                alt=""
                                className="w-20 h-20 object-cover"
                            />
                        </a>
                    </>
                ),
        },
    ];
    const { studio } = usePage().props;
    return (
        <div className="w-full h-screen bg-white px-16">
            <div className="my-6">
                <h3 className="text-orange-500 text-center text-4xl font-bold tracking-tighter">
                    Laporan Pemesanan Paket Pelanggan
                </h3>
                <p className="text-black text-center mb-4  text-xl md:text-3xl font-light">
                    {studio.nama_studio + " " + studio.tagline}
                </p>
            </div>
            <DataTable highlightOnHover data={pesanan} columns={columns} />
        </div>
    );
}

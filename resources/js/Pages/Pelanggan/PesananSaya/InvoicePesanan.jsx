import Guest from "@/Layouts/GuestLayout";
import { usePage } from "@inertiajs/react";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import CurrencyInput from "react-currency-input-field";

export default function InvoicePesanan(props) {
    const pesanan = props.pesanan;
    const { studio } = usePage().props;
    const refInvoice = useRef(null);
    console.log(pesanan);
    useEffect(() => {
        refInvoice.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);
    return (
        <div ref={refInvoice} className="py-16 px-4 md:px-8 lg:px-16">
            <div className="my-6">
                <h3 className="text-orange-500 text-center text-4xl font-bold tracking-tighter">
                    Invoice Pesanan
                </h3>
                <p className="text-white text-center mb-4  text-xl md:text-3xl font-light">
                    {studio.nama_studio + " " + studio.tagline}
                </p>
            </div>
            <div className="bg-white py-2 px-4 rounded-md">
                <div className="flex justify-between  items-center">
                    <h3 className="text-5xl font-bold capitalize transition-all duration-300 ease-in-out">
                        Invoice
                    </h3>
                    <div>
                        <h1 className=" transition-all duration-300 ease-in-outtext-4xl md:text-3xl lg:text-5xl font-bold capitalize text-orange-500">
                            {studio.nama_studio}
                        </h1>
                        <p className="text-xs md:text-md lg:text-lg italic font-light transition-all duration-300 ease-in-out ">
                            {studio.tagline}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between gap-3 my-6 px-4">
                    <div>
                        <p className="font-medium text-orange-500 text-lg md:text-xl lg:text-3xl">
                            Kepada:{" "}
                        </p>
                        <p className="text-sm md:text-base lg:text-xl capitalize">
                            {pesanan.user.name}
                        </p>
                        <p className=" text-xs md:text-sm capitalize italic">
                            {pesanan.user.email}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="font-medium text-orange-500 text-lg md:text-xl lg:text-3xl">
                            Detail Booking:{" "}
                        </p>
                        <p className="text-sm md:text-base lg:text-xl capitalize">
                            {pesanan.invoice.order_id}
                        </p>
                        <p className=" text-xs md:text-sm capitalize italic">
                            Tanggal Pesanan:{" "}
                            {moment(pesanan.tgl_pesanan).format("DD-MMMM-YYYY")}
                        </p>
                    </div>
                </div>
                <table className="table w-full font-light">
                    <thead>
                        <tr className=" bg-gray-200 font-bold text-center">
                            <td className="border-b border-gray-500 py-2">
                                No
                            </td>
                            <td className="border-b border-gray-500 py-2">
                                Nama Paket
                            </td>
                            <td className="border-b border-gray-500 py-2">
                                Tanggal Pemotretan
                            </td>
                            <td className="border-b border-gray-500 py-2">
                                Jam Pemotretan
                            </td>
                            <td className="border-b border-gray-500 py-2">
                                Harga Paket
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {pesanan.detail_pesanan.map((item, key) => (
                            <tr className="odd:bg-white even:bg-gray-100 text-center">
                                <td className="border-b border-gray-500 py-2">
                                    {key + 1}
                                </td>
                                <td className="border-b border-gray-500 py-2">
                                    {item.paket.nama_paket}
                                </td>
                                <td className="border-b border-gray-500 py-2">
                                    {item.tanggal_foto}
                                </td>
                                <td className="border-b border-gray-500 py-2">
                                    {item.jam_foto}
                                </td>
                                <td className="border-b border-gray-500 py-2">
                                    {item.paket.harga_paket}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td
                                colSpan={4}
                                className="bg-orange-500 text-white py-2 px-4 text-xl font-medium "
                            >
                                Total Pembayaran
                            </td>
                            <td
                                colSpan={4}
                                className=" bg-orange-400 text-white py-2 px-4 text-xl font-medium "
                            >
                                <CurrencyInput
                                    className="border-none bg-inherit font-medium text-xl"
                                    value={pesanan.total_pembayaran}
                                    prefix="Rp. "
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={4}
                                className="bg-orange-600 text-white py-2 px-4 text-xl font-medium "
                            >
                                Tanggal Pembayaran
                            </td>
                            <td
                                colSpan={4}
                                className=" capitalize bg-orange-400 text-white py-2 px-4 text-xl font-medium "
                            >
                                {moment(pesanan.invoice.succedet_at).format(
                                    "DD-MM-YYYY"
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={4}
                                className="bg-orange-600 text-white py-2 px-4text-xl font-medium "
                            >
                                Metode Pembayaran
                            </td>
                            <td
                                colSpan={4}
                                className=" capitalize bg-orange-400 text-white py-2 px-4 text-xl font-medium "
                            >
                                {pesanan.invoice.payment_type}
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <p className="italic font-light py-3">
                    *Terimakasih telah menggunakan jasa kami.
                </p>
            </div>
        </div>
    );
}

InvoicePesanan.layout = (page) => (
    <Guest children={page} title={"Invoice Pesanan"} />
);

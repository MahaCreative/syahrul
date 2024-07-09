import InputText from "@/Components/InputText";
import Guest from "@/Layouts/GuestLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { Cancel, Filter, Sort } from "@mui/icons-material";
import { FormControl, MenuItem, Tooltip, debounce } from "@mui/material";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { Select } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import CurrencyInput from "react-currency-input-field";

export default function Index(props) {
    const [filter, setFilter] = useState(false);
    const pesanan = props.pesanan;
    const { studio } = usePage().props;
    const pesananRef = useRef(null);
    const [params, setParams] = useState({
        cari: "",
        status: "",

        dari_tanggal: "",
        sampai_tanggal: "",
    });
    const inputRef = useRef(null);
    const reload = useCallback(
        debounce((query) => {
            router.get(route("pesanan_saya"), query, {
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
            width: "60px",
            wrap: "true",
            selector: (row, index) => index + 1,
        },
        {
            name: "Kode Pesanan",
            width: "100px",
            wrap: true,
            selector: (row) => row.kd_pesanan,
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
            width: "130px",
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
            name: "Status Pembayaran",
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
        {
            name: "Aksi",

            selector: (row) => (
                <div className="flex gap-3">
                    <Link
                        href={route("show_pesanan_saya", row.kd_pesanan)}
                        className="bg-blue-500 text-white py-2 px-3 rounded-md"
                    >
                        Lihat
                    </Link>
                    {row.invoice?.bukti_pembayaran == null && (
                        <>
                            <input
                                ref={inputRef}
                                name={row.kd_pesanan}
                                type="file"
                                className="hidden"
                                onChange={(e) => uploadBukti(e)}
                            />
                            <button
                                onClick={buktiKlick}
                                className="bg-green-500 text-white py-2 px-3 rounded-md"
                            >
                                Upload Bukti Pembayaran
                            </button>
                        </>
                    )}
                    {row.status_pembayaran == "pesan" && (
                        <button className="bg-red-500 text-white py-2 px-3 rounded-md">
                            Batalkan
                        </button>
                    )}
                </div>
            ),
        },
    ];
    const pesananSayaRef = useRef(null);
    useEffect(() => {
        pesananSayaRef.current.scrollIntoView({ behavior: "smooth" });
    }, []);
    const uploadBukti = (e) => {
        router.post(route("upload_bukti"), {
            bukti: e.target.files[0],
            kd_pesanan: e.target.name,
        });
    };
    const buktiKlick = (e) => {
        inputRef.current.click();
    };
    return (
        <div ref={pesananSayaRef} className="py-16 px-4 md:px-8 lg:px-16">
            <div className="my-6">
                <h3 className="text-orange-500 text-center text-4xl font-bold tracking-tighter">
                    Daftar Pesanan Anda
                </h3>
                <p className="text-white text-center mb-4  text-xl md:text-3xl font-light">
                    {studio.nama_studio + " " + studio.tagline}
                </p>
            </div>
            <div className="rounded-md bg-white py-3 px-4">
                <div className="flex justify-end gap-3">
                    <InputText
                        name="Cari"
                        title={"Cari..."}
                        value={params.value}
                        onChange={(e) =>
                            setParams({ ...params, cari: e.target.value })
                        }
                    />
                    <FormControl>
                        <Select
                            className="w-[50px] md:w-[150px] h-[55px] "
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={params.status}
                            onChange={(e) =>
                                setParams({ ...params, status: e })
                            }
                            label="Age"
                        >
                            <MenuItem value="">Status Pemsanan</MenuItem>
                            <MenuItem value={"selesai"}>Selesai</MenuItem>
                            <MenuItem value={"belum selesai"}>
                                Belum Selesai
                            </MenuItem>
                            <MenuItem value={"di batalkan"}>
                                Di batalkan
                            </MenuItem>
                        </Select>
                    </FormControl>

                    {filter == false ? (
                        <button
                            onClick={() => setFilter(true)}
                            className="text-2xl bg-orange-500 py-2 px-2 rounded-md text-white"
                        >
                            <Tooltip title="Filter Berdasarkan Tanggal">
                                <Sort color="inherit" fontSize="inherit" />
                            </Tooltip>
                        </button>
                    ) : (
                        <button
                            onClick={() => setFilter(false)}
                            className="text-2xl bg-red-500 py-2 px-2 rounded-md text-white"
                        >
                            <Cancel color="inherit" fontSize="inherit" />
                        </button>
                    )}
                </div>
                {filter && (
                    <div className="flex justify-end gap-3 my-3">
                        <InputText
                            label={"Dari Tanggal"}
                            type="date"
                            value={params.dari_tanggal}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    dari_tanggal: e.target.value,
                                })
                            }
                        />
                        <InputText
                            label={"Sampai Tanggal"}
                            type="date"
                            value={params.sampai_tanggal}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    sampai_tanggal: e.target.value,
                                })
                            }
                        />
                    </div>
                )}
                <DataTable data={pesanan} columns={columns} />
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <Guest children={page} title={"Pesanan Saya"} about={false} />
);

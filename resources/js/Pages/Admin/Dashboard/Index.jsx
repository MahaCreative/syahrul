import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import Highcharts from "highcharts";
import {
    AttachMoney,
    Group,
    GroupAdd,
    SentimentSatisfiedOutlined,
    ShoppingCart,
} from "@mui/icons-material";
import CurrencyInput from "react-currency-input-field";
import List from "../ListPaketPesanan/List";
export default function Index(props) {
    const stat_pembayaran_pesanan = props.stat_pembayaran_pesanan;
    const topPackages = props.topPackages;
    const count = props.count;
    const detail = props.detail;
    const stat_pembayaran = [];

    for (const i in stat_pembayaran_pesanan) {
        stat_pembayaran.push({
            name: i,
            data: Object.values(stat_pembayaran_pesanan[i]).map((value) => {
                // Konversi setiap nilai data ke tipe angka
                return typeof value === "string" ? parseFloat(value) : value;
            }),
        });
    }

    const spline = {
        chart: {
            type: "spline",
        },
        title: {
            text: "Statistik Total Pembbayaran Pemesanan Pelanggan Berdasarkan Status Pembayaram ",
        },

        xAxis: {
            categories: [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
            ],
        },
        yAxis: {
            title: {
                text: "Grafik Status Pembayaran Pesanan Pelanggan",
            },
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                },
                enableMouseTracking: false,
            },
        },
        series: stat_pembayaran,
    };
    const pieTop = {
        chart: {
            type: "pie",
        },
        title: {
            text: "10 Paket Teratas yang Dipesan",
        },

        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: "pointer",

                dataLabels: [
                    {
                        enabled: true,
                        distance: 20,
                    },
                    {
                        enabled: true,
                        distance: -40,
                        format: "{point.percentage:.1f}%",
                        style: {
                            fontSize: "12pt",
                            textOutline: "none",
                            opacity: 0.7,
                        },
                        filter: {
                            operator: ">",
                            property: "percentage",
                            value: 10,
                        },
                    },
                ],
                showInLegend: true,
            },
        },

        series: [
            {
                name: "Percentage",
                colorByPoint: true,
                data: topPackages.map((item) => ({
                    name: item.nama_paket,
                    y: item.total,
                })),
            },
        ],
    };
    console.log(count);
    return (
        <div className="w-full px-4 md:px-8 lg:px-16 transition-all duration-300 ease-in-out py-6 relative z-[999]">
            <div className="my-3 grid grid-cols-2 md:grid-cols-4 gap-3 transition-all duration-300 ease-in-out">
                <div className="flex gap-3 justify-between items-center bg-gradient-to-bl from-green-800  via-green-700 to-green-500 py-2 px-4 rounded-md shadow-sm shadow-gray-500/50">
                    <h3 className="text-white font-bold text-4xl lg:text-7xl transition-all duration-300 ease-in-out">
                        <Group color="inherit" fontSize="inherit" />
                    </h3>
                    <div className="text-right">
                        <p className="text-4xl font-bold text-white">
                            {count.jumlah_pelanggan}
                        </p>
                        <p className="text-white text-xs">
                            Jumlah Pelanggan Terdaftar
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 justify-between items-center bg-gradient-to-bl from-blue-800  via-blue-700 to-blue-500 py-2 px-4 rounded-md shadow-sm shadow-gray-500/50">
                    <h3 className="text-white font-bold text-4xl lg:text-7xl transition-all duration-300 ease-in-out">
                        <ShoppingCart color="inherit" fontSize="inherit" />
                    </h3>
                    <div className="text-right">
                        <p className="text-4xl font-bold text-white">
                            {count.jumlah_pesanan}
                        </p>
                        <p className="text-white text-xs">Jumlah Pesanan</p>
                    </div>
                </div>
                <div className="flex gap-3 justify-between items-center bg-gradient-to-bl from-yellow-800  via-yellow-700 to-yellow-500 py-2 px-4 rounded-md shadow-sm shadow-gray-500/50">
                    <h3 className="text-white font-bold text-4xl lg:text-7xl transition-all duration-300 ease-in-out">
                        <GroupAdd color="inherit" fontSize="inherit" />
                    </h3>
                    <div className="text-right">
                        <p className="text-4xl font-bold text-white">
                            {count.jumlah_team}
                        </p>
                        <p className="text-white text-xs">Jumlah Team</p>
                    </div>
                </div>
                <div className="flex gap-3 justify-between items-center bg-gradient-to-bl from-orange-800  via-orange-700 to-orange-500 py-2 px-4 rounded-md shadow-sm shadow-gray-500/50">
                    <h3 className="text-white font-bold text-4xl lg:text-7xl transition-all duration-300 ease-in-out">
                        <AttachMoney color="inherit" fontSize="inherit" />
                    </h3>
                    <div className="text-right">
                        <p className="text-4xl font-bold text-white ">
                            <CurrencyInput
                                className="bg-inherit border-none p-0 text-right"
                                prefix="Rp"
                                value={count.total_uang}
                            />
                        </p>
                        <p className="text-white text-xs">Total Pendapatan</p>
                    </div>
                </div>
            </div>
            <div className="py-1 px-2 rounded-md shadow-gray-500 shadow-sm w-full">
                <div className="flex gap-3 items-center w-full">
                    <div className="w-full">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={spline}
                        />
                    </div>
                    <div className="w-full">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={pieTop}
                        />
                    </div>
                </div>
            </div>
            <div>
                <List detail={detail} />
            </div>
        </div>
    );
}

Index.layout = (page) => <Authenticated children={page} title="Dashboard" />;

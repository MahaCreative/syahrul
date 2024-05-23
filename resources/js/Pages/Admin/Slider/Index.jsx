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
    const slider = props.slider;
    const [model, setModel] = useState(null);
    const [modal, setModal] = useState(false);
    const divStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        height: "100%",
    };
    const editHandler = (row) => {
        setModel(row);
        setModal(true);
    };
    const deleteHandler = (row) => {
        Swal.fire({
            title: `Hapus slider ${row.title}`,
            text: `Apakah anda ingin menghapus slider ${row.title}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "orange",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus slider",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("delete.kelola_slider", { id: row.id }), {
                    onError: (errors) => {
                        Swal.fire({
                            position: "center",
                            title: "Error",
                            text: "Gagal menghapus slider",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil menghapus slider",
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
                    Tambah Slider
                </button>
            </div>
            {slider.length > 0 ? (
                <div className="py-2 px-4 w-full text-black grid grid-cols-1 md:grid-cols-2  gap-3">
                    {slider.map((item, key) => (
                        <div
                            key={key}
                            className="w-full my-3 rounded-xl overflow-hidden"
                        >
                            <div>
                                <div className=" h-[90vh]" key={key}>
                                    <div
                                        className="relative h-full"
                                        style={{
                                            ...divStyle,
                                            backgroundImage: `url(/storage/${item.foto})`,
                                        }}
                                    >
                                        <div
                                            className="absolute left-0 top-0 w-full h-full bg-black/30
                                "
                                        ></div>
                                        <div
                                            className={`relative z-10 w-full h-full flex px-8 items-center md:px-16 ${
                                                item.position == "right"
                                                    ? "justify-start text-left"
                                                    : item.position == "center"
                                                    ? "justify-center text-center"
                                                    : "justify-end text-right"
                                            }  `}
                                        >
                                            <div className="w-[90%] md:w-[80%] py-3  ">
                                                <p className="text-white text-xl lg:text-3xl font-bold transition-all duration-300 ease-in-out">
                                                    {item.title}
                                                </p>
                                                <p className="text-white text-sm lg:text-lg font-light transition-all duration-300 ease-in-out">
                                                    {item.subtitle}
                                                </p>
                                                <div className="flex flex-col md:flex-row gap-1">
                                                    <button
                                                        onClick={() =>
                                                            editHandler(item)
                                                        }
                                                        className="py-1 px-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out text-lg"
                                                    >
                                                        <Tooltip
                                                            title={`Edit ${item.title}`}
                                                        >
                                                            <Edit
                                                                color="inherit"
                                                                fontSize="inherit"
                                                            />
                                                        </Tooltip>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            deleteHandler(item)
                                                        }
                                                        className="py-1 px-2 rounded-md bg-red-500 text-white hover:bg-red-700 transition-all duration-300 ease-in-out text-lg"
                                                    >
                                                        <Tooltip
                                                            title={`Delete ${item.title}`}
                                                        >
                                                            <Delete
                                                                color="inherit"
                                                                fontSize="inherit"
                                                            />
                                                        </Tooltip>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full h-full flex justify-center ">
                    <div className="text-center">
                        <h3 className="text-orange-500 font-bold text-xl md:text-3xl">
                            Uppss. Belum Ada Slider
                        </h3>
                        <p>
                            Silahkan menambahkan slider baru pada tombol dibawah
                            ini
                        </p>
                        <button
                            onClick={() => setModal(true)}
                            className="my-7 bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 font-bold"
                        >
                            Tambah Slider
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
Index.layout = (page) => <Authenticated children={page} title="Kelola Team" />;

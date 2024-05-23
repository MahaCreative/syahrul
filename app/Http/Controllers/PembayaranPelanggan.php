<?php

namespace App\Http\Controllers;

use App\Models\PaymentInvoice;
use App\Models\Pembayaran;
use Illuminate\Http\Request;

class PembayaranPelanggan extends Controller
{
    public function index(Request $request)
    {
        $query = PaymentInvoice::query()->with('pesanan');
        $pembayaran = $query->latest()->get();
        return inertia('Admin/PembayaranPelanggan/Index', compact('pembayaran'));
    }
}

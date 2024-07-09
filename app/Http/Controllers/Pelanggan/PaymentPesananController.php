<?php

namespace App\Http\Controllers\Pelanggan;

use App\Enums\InvoiceStatus;
use App\Http\Controllers\Controller;
use App\Models\DetailPesanan;
use App\Models\PaymentInvoice;
use App\Models\Pelanggan;
use App\Models\Pesanan;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PaymentPesananController extends Controller
{

    public function get_token(Request $request)
    {
        \Midtrans\Config::$serverKey = config('midtrans.MID_SERVER_KEY');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = false;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = true;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = true;

        $pesanan = Pesanan::where('kd_pesanan', $request->kd_pesanan)->latest()->first();

        $pelanggan = Pelanggan::where('user_id', $pesanan->user_id)->with('user')->first();
        $detail = DetailPesanan::where('pesanan_id', $pesanan->id)->with('paket')->latest()->get();

        // cek invoice
        // $cek_info = PaymentInvoice
        $order_id = now()->format('dmy') . $pelanggan->id . $pelanggan->user_id . $pesanan->id + rand(0, 10000);

        $params = array(
            'transaction_details' => array(
                'order_id' => $order_id,
                'gross_amount' => $pesanan->total_pembayaran,
            ),
            'customer_details' => array(
                'first_name' => $pelanggan->first_name,
                'last_name' => $pelanggan->last_name,
                'email' => $pelanggan->user->email,
                'phone' => $pelanggan->no_telp,
            ),
            'item_details' => $detail->map(fn ($item) => [
                'id' => $pesanan->kd_pesanan,
                'price' => $pesanan->total_pembayaran,
                'name' => $pesanan->kd_pesanan,
                'quantity' => 1,
            ])
        );
        $token = null;

        $cekInvoice = PaymentInvoice::where('cart_ids', $pesanan->id)->first();

        if ($cekInvoice) {
            $token = $cekInvoice->snap_token;
        } else {
            $snapToken = \Midtrans\Snap::getSnapToken($params);
            $invoice = PaymentInvoice::updateOrCreate(
                [
                    'order_id' => $order_id
                ],
                [
                    'user_id' => $pelanggan->user_id,
                    'cart_ids' => $pesanan->id,
                    'order_id' => $order_id,
                    'total_pembayaran' => $pesanan->total_pembayaran,
                    'cart_ids' => $pesanan->id,
                    'snap_token' => $snapToken,

                ]
            );
            $token = $snapToken;
        }


        return response()->json($token);
    }

    public function payment_notif(Request $request)
    {

        $serverKey = config('midtrans.MID_SERVER_KEY');
        $hashed = hash('sha512', $request->order_id . $request->status_code . $request->gross_amount . $serverKey);
        if ($hashed == $request->signature_key) {

            if ($request->transaction_status == 'capture' or $request->transaction_status == 'settlement') {
                $invoice = PaymentInvoice::where('order_id', $request->order_id)->first();
                $invoice->update([
                    'status' => $request->transaction_status,
                    'payment_type' => $request->payment_type == 'cstore' ? $request->store : $request->payment_type,
                    'succeeded_at' => Carbon::parse($request->transaction_time),
                ]);

                $pesanan = Pesanan::findOrFail($invoice->cart_ids);
                $pesanan->update(['status_pembayaran' => 'lunas', 'aktif_payment' => 'tidak', 'tanggal_pembayaran' => $request->transaction_time,]);
            }
        }
    }

    public function upload_bukti(Request $request)
    {

        $bukti = $request->file('bukti')->store('bukti_pembayaran');
        $pesanan = Pesanan::with('invoice')->where('kd_pesanan', $request->kd_pesanan)->first();
        $pesanan->invoice->update(['bukti_pembayaran' => $bukti]);
    }
}

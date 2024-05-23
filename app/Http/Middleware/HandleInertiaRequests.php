<?php

namespace App\Http\Middleware;

use App\Models\Pesanan;
use App\Models\Setting;
use App\Models\Slider;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $studio = Setting::first();
        $cart = ["kd_pesanan" => null, "count" => 0];
        if ($request->user()) {

            $cek = Pesanan::withCount('detailPesanan')->where('user_id', $request->user()->id)
                ->where('status_pembayaran', 'belum lunas')
                ->where('status_pemesanan', 'belum selesai')
                ->first();

            if ($cek) {
                $cart['count'] = $cek->detail_pesanan_count;
                $cart['kd_pesanan'] = $cek->kd_pesanan;
            }
        }
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'studio' => $studio,
            'cart' => $cart,
            'slider' => Slider::where('status', 'ya')->latest()->get(),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}

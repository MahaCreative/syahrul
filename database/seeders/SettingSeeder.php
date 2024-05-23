<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::create([
            'nama_studio' => 'Galiph Studio',
            'tagline' => 'We Are Creative And Professional Photographer',
            'foto_studio' => '/Image/default_foto.jpg',
            'alamat_studio' => 'Jl. Diponegoro Kelurahan Karema Kecamatan Mamuju No 18',
            'telp_studio' => '082194255717',
            'email_studio' => 'galiphstudio@gmail.com',
            'facebook_studio' => 'Galiph.me',
            'instagram_studio' => '@galiphh',
            'link_facebook_studio' => 'https://web.facebook.com/?locale=id_ID&_rdc=1&_rdr',
            'link_instagram_studio' => 'https://web.facebook.com/?locale=id_ID&_rdc=1&_rdr',
            'deskripsi_studio' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, provident quo? Incidunt temporibus consectetur distinctio ullam cumque labore, voluptas sit repellendus. Ipsum magnam perspiciatis alias at illum doloribus reiciendis, nostrum hic, ab quas dolor nisi eligendi quia tempora reprehenderit ut ipsa amet id sunt perferendis corporis veniam. Odit magni nobis sit, sed quaerat nulla rerum suscipit quis totam veniam sunt minus obcaecati maiores vel ratione. Consectetur sunt cupiditate, aperiam nemo officia molestias, nostrum quia et recusandae temporibus illo assumenda reiciendis, accusamus tempore aliquid asperiores quae possimus itaque expedita adipisci? Illo sapiente repellat cupiditate aliquid, explicabo inventore cum dolor eligendi enim.',
        ]);
    }
}

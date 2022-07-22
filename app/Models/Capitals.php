<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Capitals extends Model
{
    use HasFactory;

    protected $fillable = [
        'capital',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

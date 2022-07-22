<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unique;
            $table->string('firstName');
            $table->string('lastName');
            $table->string('email');
            $table->string('company');
            $table->string('companyId');
            $table->integer('loanAmnt');
            $table->string('bankName')->nullable();
            $table->string('accountName')->nullable();
            $table->string('accountNmbr')->nullable();
            $table->string('status');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('loans');
    }
};

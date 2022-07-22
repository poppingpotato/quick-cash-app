<?php

use App\Http\Controllers\CompaniesController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\LoansController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use GuzzleHttp\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/home', function () {
//     return view('welcome');
// });

Route::group(['middleware' => 'prevent-back-history'], function () {
    Auth::routes();

    Route::group(['middleware' => 'administrator'], function() {
        Route::resource('employees', EmployeesController::class);
        Route::get('/getEmployees', [App\Http\Controllers\EmployeesController::class, 'getEmployees']);

        Route::resource('companies', CompaniesController::class);
        Route::get('/getAllCompanies', [App\Http\Controllers\CompaniesController::class, 'getAllCompanies']);
       
        Route::resource('users', UserController::class);
        Route::get('/getUsers', [App\Http\Controllers\UserController::class, 'getUsers']);
       
       
    });
   
    Route::get('/getCompany', [App\Http\Controllers\UserController::class, 'getCompany']);
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::resource('profile', ProfileController::class);

    Route::resource('loans', LoansController::class);
    Route::put('/loanApproved/{loan}', [App\Http\Controllers\LoansController::class, 'approveLoan']);
    Route::put('/loanCancelled/{loan}', [App\Http\Controllers\LoansController::class, 'cancelLoan']);

    Route::put('/editCapital/{loan}', [App\Http\Controllers\LoansController::class, 'editCapital']);
    Route::get('/getCapital', [App\Http\Controllers\LoansController::class, 'getCapital']);
    Route::get('/getMyLoans',[App\Http\Controllers\LoansController::class, 'getMyLoans']);
    
    Route::get('/getLoggedInUser', [App\Http\Controllers\UserController::class, 'getLoggedInUser']);
});

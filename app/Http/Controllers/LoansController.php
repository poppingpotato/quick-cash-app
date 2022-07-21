<?php

namespace App\Http\Controllers;

use App\Models\Loans;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LoansController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('welcome');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user_id = $request->get('user_id');
        $firstName = $request->get('firstName');
        $lastName = $request->get('lastName');
        $email = $request->get('email');
        $company = $request->get('company');
        $companyId = $request->get('companyId');
        $loanAmnt = $request->get('loanAmnt');
        $status = "Pending";

        Loans::create([
            'user_id' => $user_id,
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'company' => $company,
            'companyId' => $companyId,
            'loanAmnt' => $loanAmnt,
            'status' => $status,
        ]);

        return response()->json([
            'user_id' => $user_id,
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'company' => $company,
            'companyId' => $companyId,
            'loanAmnt' => $loanAmnt,
            'status' => $status,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Loans  $loans
     * @return \Illuminate\Http\Response
     */
    public function show(Loans $loans)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Loans  $loans
     * @return \Illuminate\Http\Response
     */
    public function edit(Loans $loans)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Loans  $loans
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Loans $loans)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Loans  $loans
     * @return \Illuminate\Http\Response
     */
    public function destroy(Loans $loans)
    {
        //
    }

    public function getMyLoans()
    {
        if (Auth::user()->role === "Administrator" || Auth::user()->role === "Owner") {
            $getAllLoans = Loans::all();
            return response()->json(['loans' => $getAllLoans]);
        } else if (Auth::user()->role === "Payroll Officer") {
            $getUserCompany = Auth::user()->company;
            $getLoans = Loans::where('company', $getUserCompany)->get();
            return response()->json(['loans' => $getLoans]);
        } else {
            $myUser = Auth::id();
            $getLoans = Loans::where('user_id', $myUser)->get();
            return response()->json(['loans' => $getLoans]);
        }
    }
}

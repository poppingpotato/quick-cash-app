<?php

namespace App\Http\Controllers;

use App\Models\Capital;
use App\Models\Capitals;
use App\Models\Loans;
use Carbon\Carbon;
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
    public function edit($id)
    {
        $userDetails = Loans::findOrFail($id);
        return response()->json([$userDetails]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Loans  $loans
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $id = $request->get('id');
        $user_id = $request->get('user_id');
        $firstName = $request->get('firstName');
        $lastName = $request->get('lastName');
        $email = $request->get('email');
        $company = $request->get('company');
        $companyId = $request->get('companyId');
        $loanAmnt = $request->get('loanAmnt');
        $bankName = $request->get('bankName');
        $accountName = $request->get('accountName');
        $accountNmber = $request->get('accountNmber');
        $status = $request->get('status');

        Loans::where('id', $id)->update([
            'user_id' => $user_id,
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'company' => $company,
            'companyId' => $companyId,
            'loanAmnt' => $loanAmnt,
            'bankName' => $bankName,
            'accountName' => $accountName,
            'accountNmbr' => $accountNmber,
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
            'bankName' => $bankName,
            'accountName' => $accountName,
            'accountNmbr' => $accountNmber,
            'status' => $status,
        ]);
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
    /**
     * The formula for calculating your monthly payment is:
     * a ÷ {[(1 + r)^n]-1} ÷ [r(1+r)^n]
     *
     *a: Loan amount (₱100,000)
     *r: Annual interest rate divided by 12 monthly payments per year (0.10 ÷ 12 = 0.0083)
     *n: Total number of monthly payments (24)
     *Monthly loan amortization = 100,000 ÷ {[(1 + 0.0083)^24]-1} ÷ [0.0083(1+0.0083)^24]
    
     */
    public function approveLoan(Request $request, $id)
    {
        $id = $request->get('id');
        $loanAmnt = $request->get('loanAmnt');
        $status = "Approved";
        $monthStart = Carbon::now()->startOfMonth();
        $amort = $loanAmnt * ((0.05 * (1.05) ^ 3) / (1.05) ^ 3 - 1);
        // Loans::where('id', $id)->update([
        //     'status' => $status,
        // ]);



        // return response()->json([
        //     'id' => $id,
        //     'loanAmnt' => $loanAmnt,
        //     'status' => $status,
        // ]);
        return response()->json($monthStart);
    }


    public function cancelLoan(Request $request, $id)
    {
        $id = $request->get('id');
        $status = "Cancelled";

        Loans::where('id', $id)->update([
            'status' => $status,
        ]);

        return response()->json([
            'id' => $id,
            'status' => $status,
        ]);
    }

    public function getCapital()
    {
        $capital = Capitals::all();
        return response()->json(['capital' => $capital]);
    }

    public function editCapital(Request $request, $id)
    {
        $id = $request->get('id');
        $capital = $request->get('capital');

        Capitals::where('id', $id)->update([
            'id' => $id,
            'capital' => $capital,
        ]);

        return response()->json([
            'id' => $id,
            'capital' => $capital,
        ]);
    }
}

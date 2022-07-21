<?php

namespace App\Http\Controllers;

use App\Models\Companies;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
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
        $firstName = $request->get('firstName');
        $lastName = $request->get('lastName');
        $email = $request->get('email');
        $company = $request->get('company');
        $companyId = $request->get('companyId');
        $role = $request->get('role');

        User::create([
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'company' => $company,
            'companyId' => $companyId,
            'role' => $role,
            'password' => Hash::make('1'),
        ]);
        return response()->json([
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'company' => $company,
            'companyId' => $companyId,
            'role' => $role,
            'password' => Hash::make('1'),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // $userDetails = User::findorFail($id);

        // return response()->json($userDetails);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $userDetails = User::findOrFail($id);
        return response()->json([$userDetails]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $id = $request->get('id');
        $firstName = $request->get('firstName');
        $lastName = $request->get('lastName');
        $email = $request->get('email');
        $company = $request->get('company');
        $companyId = $request->get('companyId');
        $role = $request->get('role');

        User::where('id', $id)->update([
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'company' => $company,
            'companyId' => $companyId,
            'role' => $role
        ]);


        return response()->json([
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'company' => $company,
            'companyId' => $companyId,
            'role' => $role
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getUsers()
    {
        if(Auth::user()->role === "Administrator") {
            $userRole = Auth::user()->role;
            $users = User::where('role', '!=', 'Administrator')
            ->get();
            return response()->json(['users' => $users]);
        } else {
            $users = User::all();
            // return $users;
            return response()->json(['users' => $users]);
        }
        
    }

    public function getLoggedInUser()
    {
        $user = Auth::user();
        return response()->json(['user' => $user]);
    }
    
    public function getCompany()
    {
        $getcompany = Companies::all();
        return response()->json(['company' => $getcompany]);
    }


}

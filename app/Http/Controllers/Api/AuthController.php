<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // dafter
    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'username' => 'required',
            'password' => 'required',
            'confirm_password' => 'required|same:password'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'message' => 'Validation error',
                'data' => $validator->errors()->all()
            ]);
        }   

        $user = User::create([
            "name"=>$request->name,
            "username"=>$request->username,
            "password"=>bcrypt($request->password)
        ]);

        $response=[];
        $response["token"] = $user -> createToken("MyApp")->plainTextToken;
        $response["name"] = $user->name;
        $response["username"] = $user->username;


        return response()->json([
            'status' => 1,
            'message' => 'Admin registered',
            'data' => $response
        ]);
    }

    //login
    public function login(Request $request)
    {
        if(Auth::attempt(["username"=>$request->username, "password"=>$request->password])){
            
            $user = Auth::user();

            $response=[];
            $response["token"] = $user->createToken("MyApp")->plainTextToken;
            $response["name"] = $user->name;
            $response["username"] = $user->username;
            
            return response()->json([
                'status' => 1,
                'message' => 'Authentication succes',
                'data' => $response
            ]);
        }

            return response()->json([
                'status' => 1,
                'message' => 'Authentication error',
                'data' => null
            ]);
    }

    public function show(Request $request, string $id)
    {
        $user = User::find($id);

        return response()->json([
            'status' => 1,
            'message' => 'Admin found',
            'data' => $user
        ]);
    }
}

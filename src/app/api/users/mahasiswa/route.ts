import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { cloneElement } from "react";
import { connect } from "@/lib/mongodb/config";
import mongoose from "mongoose";

connect()
export async function GET(request: NextRequest) {
  try {
    const mahasiswa = await User.find({level: 'mahasiswa'}).maxTimeMS(5000);
    const promise = mahasiswa.map(( async (item) => {

      let pembimbing1, pembimbing2;
      if(item.id_pembimbing_1 && item.id_pembimbing_2){
         pembimbing1 = User.findById(item.id_pembimbing_1).exec();
         pembimbing2 = User.findById(item.id_pembimbing_2).exec();

      }
        
        const [pb1, pb2] = await Promise.all([pembimbing1, pembimbing2]);
        return {
            ...item,
            pembimbing1: pb1,
            pembimbing2: pb2
        }
    }));
    const result = await Promise.all(promise);
    return NextResponse.json({
       result
    })
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}

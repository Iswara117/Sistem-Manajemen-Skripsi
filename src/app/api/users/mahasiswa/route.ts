import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { cloneElement } from "react";
export async function GET(request: NextRequest) {
  try {
    const mahasiswa = await User.find({level: 'mahasiswa'}).exec();
    const promise = mahasiswa.map(( async (item) => {
        const pembimbing1 = User.findOne({id_pembimbing_1: item.id_pembimbing_1}).exec();
        const pembimbing2 = User.findOne({id_pembimbing_2: item.id_pembimbing_2}).exec();

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

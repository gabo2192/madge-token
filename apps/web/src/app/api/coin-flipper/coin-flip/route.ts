import config from "@/lib/contracts-config";
import { MadgeCasino__factory } from "@/typechain-types";
import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const randomNumber = Math.random() < 0.5 ? 0 : 1;
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const contract = new ethers.Contract(
    config.casinoContract,
    MadgeCasino__factory.abi,
    provider
  );

  const requestId = Math.floor(Math.random() * 1000000);
  const data = contract.interface.encodeFunctionData("flipCoin", [
    requestId,
    body.token,
    body.tokenOwner,
    body.value * 10 ** 8,
    body.option,
    randomNumber,
  ]);

  return NextResponse.json({ rawTransaction: data, requestId });
}

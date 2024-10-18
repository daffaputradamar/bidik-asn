import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const provinceCode = searchParams.get('provinceCode');


  if(!provinceCode) {
    return NextResponse.json([])
  }

  try {
    const { data } = await axios.get(`https://sipedas.pertanian.go.id/api/wilayah/list_kab?pro=${provinceCode}&thn=2024`);
    const formattedDate = Object.entries(data).map(([code, name]) => ({ code, name })).sort((a,b) => {
      const nameA = (a.name as string).toUpperCase();
      const nameB = (b.name as string).toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      return 0;
    })
    return NextResponse.json(formattedDate);
  } catch {
    return NextResponse.error();
  }
}

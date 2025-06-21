import { db } from "@/config/db"
import { replicate } from "@/config/replicate"
import { aiGeneratedImage, users } from "@/config/schema"
import { model } from "@/constants/data"
import { checkCredits } from "@/lib/actions"
import { imagekit } from "@/lib/imagekit"
import axios from "axios"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    const reqData = await req.json()
    console.log('reqData',reqData.userEmail)
    const prompt = `A ${reqData.roomtType} with a ${reqData.designType} style interior. ${reqData.additional}`
    
    // check credits
    const isHasCredits = await checkCredits(reqData.userId)

    if ( !isHasCredits ) return NextResponse.json(
        { success: false, message: "No enough credits", status: 400 },
        { status: 400 }
      );
    
    try {
       
        // ai image
        // 1 const out = await aiGenerateImg(reqData.image, prompt)
        // 1 const out = 'https://ik.imagekit.io/kuu8mr87u/interior/1749967934950_5u7xiNOL4.png'
        // covert 
        // const img = await convertImgUrl2Base64(out)
        // 图片保存
        // const imgUrl = await saveImg(img)
        const imgUrl = 'https://ik.imagekit.io/kuu8mr87u/interior/1749967934950_5u7xiNOL4.png'
        console.log('insert',reqData,imgUrl)
        const res = await db.insert(aiGeneratedImage).values({
            roomType: reqData.roomType,
            designType: reqData.designType,
            orgImage: reqData.image,
            aiImage: imgUrl,
            userEmail: reqData.userEmail
        }).returning()
        // 若果数据库插入失败，则返回错误
        if (!res) return NextResponse.json({ message: '插入数据库失败',success: false }, { status: 500 })
        const userCredits = await db.select({ credits: users.credits}).from(users).where(eq(users.id, reqData.userId))
        console.log('res',res[0], reqData.userId)
        const upCreditsRes = await db.update(users).set({credits: userCredits[0].credits - 1}).where(eq(users.id, reqData.userId))
        console.log('upCreditsRes',upCreditsRes)
        if (upCreditsRes.rowCount === 0) throw NextResponse.json({
            message: 'Minus credits failed',
            success: false,
            status: 500
        },{
            status: 500
        })
        
        
        return NextResponse.json({
            success: true,
            message: 'Image created successfully',
            imgUrl,
            ...res[0]
        })
    }
    catch (error) {
        console.log('error',error)
        return NextResponse.json({
            message: 'Error',
            success: false,
            status: 500
        })
    }
}

const convertImgUrl2Base64 = async (img: string) => {
    const res = await axios.get(img, { responseType: 'arraybuffer' })
    const imgRaw =  Buffer.from(res.data, 'binary').toString('base64')
    return `data:${res.headers['content-type']};base64,${imgRaw}`
}

const aiGenerateImg = async (image: string, prompt: string) => {
    const output: any = await replicate.run(model.interior as any,{
        input: {
            image,
            prompt
        }
    })
    console.log('res',output[0].url().href)
  return output[0].url().href
}

const saveImg = async (imgFile: any) => {
    const {url} = await imagekit.upload({
        file: imgFile,
        fileName: Date.now() + Math.floor(Math.random() * 1000) + '.png',
        useUniqueFileName: true,
        tags: ['image'],
        folder: '/interior',
    })
    console.log('imgUrl',url)
    return url
}
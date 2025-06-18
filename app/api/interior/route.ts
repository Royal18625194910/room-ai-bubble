import { db } from "@/config/db"
import { replicate } from "@/config/replicate"
import { aiGeneratedImage } from "@/config/schema"
import { model } from "@/constants/data"
import { imagekit } from "@/lib/imagekit"
import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    const reqData = await req.json()
    console.log('reqData',reqData.userEmail)
    const prompt = `A ${reqData.roomtType} with a ${reqData.designType} style interior. ${reqData.additional}`
    
    try {
        // ai image
        // const out = await aiGenerateImg(reqData.image, prompt)
        // const out = 'https://ik.imagekit.io/kuu8mr87u/interior/1749967934950_5u7xiNOL4.png'
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
        console.log('res',res[0])
        return NextResponse.json({
            imgUrl,
            ...res[0]
        })
    }
    catch (error) {
        console.log('error',error)
        return NextResponse.json({
            error: error,
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
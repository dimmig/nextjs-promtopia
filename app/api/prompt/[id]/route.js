import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
        return new Response("Prompt not found", {status: 404})
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fecth all prompts", { status: 500 });
  }
};

export const PATCH = async (req, {params}) => {
    const {prompt, tag} = await req.json()

    try {   
        await connectToDB()
        const existingPrompt = await Prompt.findById(params.id)
        if (!existingPrompt) {
            return new Response("Prompt not found", {status: 404})
        }

        console.log("prompt", prompt);

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        console.log(existingPrompt);


        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), {status: 200})
    } catch (error) {
        return new Response("Update prompt error", {status: 500})
    }
}

export const DELETE = async (req, {params}) => {
    try {
        await connectToDB()

        await Prompt.findByIdAndRemove(params.id)
        return new Response("Prompt deleted successfully", {status: 200})
    } catch (error) {
        return new Response("Failed to delete the ptompt", {status: 500})
        
    }
}
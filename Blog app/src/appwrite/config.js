import conf from '../conf/conf';

import {Client,Account,ID,Databases,Storage,Query} from "appwrite";

class Services{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            const post=await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,ID.unique(),{
                title,
                content,
                featuredImage,
                status,
                userId
            });
            return post;
        } catch (error) {
            throw error;
        }
    
    }
    // async getPosts(){
    //     try {
    //         const posts=await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId);
    //         return posts;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    async updatePost(id,{title,content,featuredImage,status}){
        try {
            const post=await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,id,{
                title,
                content,
                featuredImage,
                status
            });
            return post;
        } catch (error) {
            throw error;
        }
    }
    async deletePost(id){
        try {
            const post=await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,id);
            return true;
        } catch (error) {
            return false;
        }
    }
    async getPost(id){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            )
        } catch (error) {
            return false;
        }
    }
    async getPosts(queries=[Query.equal("status","active") ]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,

                )
        } catch (error) {
            console.log("Appwrite service: Get posts",error);
            return false;
        }
    }

    //file upload services
    async uploadFile(file){
        try {
            const fileUpload=await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file);
            return fileUpload;
        } catch (error) {
            throw error;
        }
    }

    //delete file
    async deleteFile(fileId){
        try {
            const file=await this.bucket.deleteFile(conf.appwriteBucketId,fileId);
            return true;
        } catch (error) {
            return false;
        }
    }

    //get file preview

    async getFilePreview(fileId){
        try {
            const file=await this.bucket.getFilePreview(conf.appwriteBucketId,fileId);
            return file;
        } catch (error) {
            return false;
        }
    }
    

}
const service=new Services();

export default service;


import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.apprwriteUrl)
      .setProject(conf.apprwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        conf.apprwriteDataBaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return (
        await this.databases.updateDocument(
          conf.apprwriteDataBaseId,
          conf.appwriteCollectionId,
          slug,
          {
            title,
            content,
            featuredImage,
            status,
          }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost (slug){
    try {
        return await this.databases.deleteDocument(
            conf.apprwriteDataBaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true
    } catch (error) {
        console.log("ERROR IN DELETE ::",error);
        return false
    }
  }
  async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.apprwriteDataBaseId,
            conf.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("ERROR IN get Post ::",error);
        return false
    }
  }
  async getPosts(queries = [Query.equal("status","active")]){
    try {
       return await this.databases.listDocuments(
            conf.apprwriteDataBaseId,
            conf.appwriteCollectionId,
            queries,
            100,
            0
        )
    } catch (error) {
        console.log("ERROR IN get Posts ::",error);
        return false
    }
  }

  //file upload service 
  async uploadFile(file){
    try {
       return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
       )
        
    } catch (error) {
        console.log("ERROR IN upload File ::",error);
        return false
    }
  }

  //delete file upload service
  async deleteFile(fileId){
    try {
        return await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
    } catch (error) {
        console.log("ERROR IN delete File ::",error);
        return false
    }
  }
  getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    )
  }
}

const service = new Service();
export default service;

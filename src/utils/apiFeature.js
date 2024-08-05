
export class ApiFeature {
    constructor(mongoQuery,searchQuery){
        this.mongoQuery = mongoQuery;
        this.searchQuery = searchQuery;
    }

    pagination(){
        let pageNumber=parseInt(this.searchQuery.page)*1||1
        if (this.searchQuery.page<1)pageNumber=1
        const limit=2
        let skip =(pageNumber-1)*limit
        this.pageNumber = pageNumber
        this.limit = limit
         this.mongoQuery.skip(skip).limit(limit)
        return this;
    }
    filter(){
        let filterObj=structuredClone(this.searchQuery)
    filterObj=JSON.stringify(filterObj)
    filterObj=filterObj.replace(/(gt|gte|lt|lte)/g,val=> "$" + val)
    filterObj=JSON.parse(filterObj)
    let excluded=["page","sort","fields","search"].map(field=>delete filterObj[field])
    this.mongoQuery.find(filterObj)
        return this
    }

    sort(){
        if(this.searchQuery.sort){
            let sortArr=this.searchQuery.sort.split(",").join(" ")
            this.mongoQuery.sort(sortArr)
        }
        return this
    }

    fields(){
        if(this.searchQuery.fields){
            let selectFields=this.searchQuery.fields.split(",").join(" ")
            this.mongoQuery.select(selectFields)
        }
        return this
    }

    search(){
        if(this.searchQuery.search){
                this.mongoQuery.find({
                $or:[
                    {title:{$regex:this.searchQuery.search, $options:"i"}},
                    {description:{$regex:this.searchQuery.search, $options:"i"}},
                    {slug:{$regex:this.searchQuery.search, $options:"i"}},
                    {name:{$regex:this.searchQuery.search, $options:"i"}},
                    // {slug:{$regex:this.searchQuery.search, $options:"i"}},
                ]
            })
        }
        return this
    }
}
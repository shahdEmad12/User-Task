import { paginationFunction } from "./pagination.js"
export class APIFeatures {
    constructor(query, mongooseQuery){
        this.query = query
        this.mongooseQuery = mongooseQuery
    }

    pagination({page, size}) {
    const {limit, skip} = paginationFunction(page, size)
    this.mongooseQuery= this.mongooseQuery.limit(limit).skip(skip)
    return this
    }

    sort() {
        if (this.query.sort) {
            const sortBy = this.query.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
        }
        return this;
    }


    filter(filters) {
        const queryFilter = JSON.parse(
            JSON.stringify(filters).replace(
                /gt|gte|lt|lte|in|nin|eq|ne|regex/g,
                (operator) => `$${operator}`,
            )
        );

        this.mongooseQuery = this.mongooseQuery.find(queryFilter);
        return this;
    }
}



module.exports = (dependencies) => {

    /**
     * Service to create a new post
     * @param {*} data 
     * @param {String} data.articleHead - Post header
     * @param {String} data.articleBody - Post body for details
     * @param {String} data.author - Post author
     * @returns {Object} response - info and execution results 
     * @returns {boolean} response.success - value to check if process has errors 
     * @returns {number} response.code - code of error, this could be an http status code 
     * @returns {String} response.message - error message
     * @returns {Object} response.data - posts data
     */
    async function create(data) {
        try {
            // validate fields
            const { constants } = dependencies;
            if (!data || !data.articleHead || !data.articleBody || !data.author) {
                return {
                    success: false,
                    code: constants.POSTS.MISSING_PARAMS.code,
                    message: constants.POSTS.MISSING_PARAMS.message
                }
            }
            // create post
            const { Posts } = dependencies;
            const response = await Posts.create({
                articleHead: data.articleHead,
                articleBody: data.articleBody,
                author: data.author
            });
            // return response
            return {
                success: true,
                data: response
            };
        } catch (error) {
            return {
                success: false,
                code: 0,
                message: `Error in create post, ${error.message}`
            }
        }
    }

    /**
     * Service to update a post by id
     * @param {String} id - objectId from collection Posts
     * @param {Object} data 
     * @param {String} data.articleHead - Post header
     * @param {String} data.articleBody - Post body for details
     * @param {String} data.author - Post author
     * @returns {Object} response - info and execution results 
     * @returns {boolean} response.success - value to check if process has errors 
     * @returns {number} response.code - code of error, this could be an http status code 
     * @returns {String} response.message - error message
     * @returns {Object} response.data - posts data
     */
    async function update(id, data) {
        try {
            // validate fields
            const { constants } = dependencies;
            if (!id) {
                return {
                    success: false,
                    code: constants.POSTS.MISSING_POST_ID.code,
                    message: constants.POSTS.MISSING_POST_ID.message
                }
            }

            if (!data || !data.articleHead || !data.articleBody || !data.author) {
                return {
                    success: false,
                    code: constants.POSTS.MISSING_PARAMS.code,
                    message: constants.POSTS.MISSING_PARAMS.message
                }
            }

            // update post
            const { Posts } = dependencies;
            const response = await Posts.findByIdAndUpdate(id, {
                articleHead: data.articleHead,
                articleBody: data.articleBody,
                author: data.author
            }, { new: true, runValidations: true });

            // return response
            return {
                success: true,
                data: response
            };

        } catch (error) {
            return {
                success: false,
                code: 0,
                message: `Error in update post, ${error.message}`
            }
        }
    }

    /**
     * function to get posts
     * @param {Object[]} filters - Properties to filter data and posts
     * @returns {Object} response - info and execution results 
     * @returns {boolean} response.success - value to check if process has errors 
     * @returns {number} response.code - code of error, this could be an http status code 
     * @returns {String} response.message - error message
     * @returns {Object[]} response.data - posts data
     */
    async function getAll(filters = []) {
        try {
            let filtersForQuery = buildFilters(filters);
            const { Posts } = dependencies;
            const response = await Posts.find(filtersForQuery);
            return {
                success: true,
                data: response
            };
        } catch (error) {
            return {
                success: false,
                code: 0,
                message: `Error in get posts, ${error.message}`
            }
        }
    }

    /**
     * Function to validate filters for Posts command.
     * Feel free to improve this to use indexes for queries, the objetive of this
     * function is to check the fiels to filter posts and not pass any invalid property
     * @param {Object[]} filters - Properties to filter posts
     * @returns {Object}
     */
    function buildFilters(filters = []) {
        let filtersForQuery = {};
        if (!filters.length) {
            return filtersForQuery;
        }
        const validFilters = ['articleHead', 'articleBody', 'author'];
        for (let i = 0; i < filters.length; i++) {
            const currentFilter = filters[i];
            if (validFilters.includes(currentFilter.field)) {
                filtersForQuery[currentFilter.field] = currentFilter.value;
            }
        }
        return filtersForQuery;
    }

    async function getById(id) {
        // TODO write code here after tests
    }

    module.exports.create = create;
    module.exports.update = update;
    module.exports.getAll = getAll;
    module.exports.getById = getById;

};
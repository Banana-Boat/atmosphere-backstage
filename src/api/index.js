import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export const fetchComplaintData = query => {
    return request({
        url: './complaint_table.json',
        method: 'get',
        params: query
    });
};

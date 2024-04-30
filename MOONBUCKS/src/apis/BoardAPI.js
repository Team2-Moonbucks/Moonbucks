const API_BASE_URL = 'http://localhost:3000/api'; 

// 게시글 목록 가져오기
export const fetchPosts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/pages/BoardPage`);
        if (!response.ok) {
            throw new Error('서버 통신 중 오류가 발생했습니다.');
        }
        return await response.json();
    } catch (error) {
        console.error('게시글 목록을 가져오는 중 오류가 발생했습니다:', error);
    }
};

// 게시글 생성
export const createPost = async (postData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        if (!response.ok) {
            throw new Error('게시글 생성 중 오류가 발생했습니다.');
        }
        return await response.json();
    } catch (error) {
        console.error('게시글 생성 중 오류가 발생했습니다:', error);
    }
};

// 게시글 수정
export const updatePost = async (postId, postData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        if (!response.ok) {
            throw new Error('게시글 수정 중 오류가 발생했습니다.');
        }
        return await response.json();
    } catch (error) {
        console.error('게시글 수정 중 오류가 발생했습니다:', error);
    }
};

// 게시글 삭제
export const deletePost = async (postId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('게시글 삭제 중 오류가 발생했습니다.');
        }
        return await response.json();
    } catch (error) {
        console.error('게시글 삭제 중 오류가 발생했습니다:', error);
    }
};

// 특정 게시글 검색
export const searchPosts = async (query) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('검색 중 오류가 발생했습니다.');
        }
        return await response.json();
    } catch (error) {
        console.error('게시글 검색 중 오류가 발생했습니다:', error);
    }
};

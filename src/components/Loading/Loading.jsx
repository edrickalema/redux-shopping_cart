import React from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
	.loading {
		text-align: center;
		font-size: 1.5em;
		font-weight: 600;
		padding: 1em 0;
		width: 100%;
		margin: auto;
	}
`;
function Loading() {
	return (
		<LoadingWrapper>
			{' '}
			<h1 className='loading'>loading ...</h1>
		</LoadingWrapper>
	);
}

export default Loading;

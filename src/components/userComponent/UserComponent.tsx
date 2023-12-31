import {useState, useEffect} from 'react';
import fetchData from '../../api/fetchData';
import {FiGithub} from 'react-icons/fi';
import styled from 'styled-components';
import {SearchBar, UserRepositories} from '..';
import {useLocation} from 'react-router-dom';
import {breakpoints} from '../../styles/breakpoints';
import error404 from '../../assets/error-404.jpg';

interface User {
	login: string;
	name: string;
	avatarUrl: string;
	url: string;
	followers: {
		totalCount: number;
	};
	following: {
		totalCount: number;
	};
	repositories: {
		nodes: Repository[];
	};
}

export interface Repository {
	id: string;
	name: string;
	url: string;
}

/**
 * Represents a UserComponent displaying user information and repositories.
 * @component
 */

const UserComponent = () => {
	const [userData, setUserData] = useState<User | null>(null);
	const [filteredRepo, setFilteredRepo] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const location = useLocation();
	const username = location.pathname.substring(1); //This way we get the username from the url
	const query = `query {
        user(login: "${username}") {
            login
            name
            avatarUrl
            url
            followers {
                totalCount
            }
            following {
                totalCount
            }
            repositories(first: 50) {
                nodes {
                id
                name
                url
                }
            }
        }
    }`;

	/**
	 * Fetch user data based on the username and populate the `userData` state.
	 */

	useEffect(() => {
		const fetchDataUser = async () => {
			try {
				const data = await fetchData(query);
				setUserData(data?.data?.user);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};
		fetchDataUser();
	}, [query]);

	/**
	 * Simulate loading for 3 seconds.
	 */

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	}, []);

	/**
	 * Represents user information.
	 * @typedef {Object} User
	 * @property {string} login - The user's login name.
	 * @property {string} name - The user's name.
	 * @property {string} avatarUrl - The URL of the user's avatar.
	 * @property {string} url - The URL of the user's GitHub profile.
	 * @property {Object} followers - The user's followers information.
	 * @property {number} followers.totalCount - The total number of followers.
	 * @property {Object} following - The user's following information.
	 * @property {number} following.totalCount - The total number of users the user is following.
	 * @property {Object} repositories - The user's repositories.
	 * @property {Array<Repository>} repositories.nodes - An array of user repositories.
	 */

	/**
	 * Represents a user repository.
	 * @typedef {Object} Repository
	 * @property {string} id - The repository's ID.
	 * @property {string} name - The repository's name.
	 * @property {string} url - The repository's URL.
	 */

	return (
		<UserComponentStyles>
			{loading ? (
				<div className="loading-spinner"></div>
			) : userData === null ? (
				<img src={error404} alt="Error 404" />
			) : (
				<>
					<div className="user__info">
						<img src={userData?.avatarUrl} alt="User Logo" className="user__info__pic" />
						<div className="user__info__global">
							<p className="user__info__global__username">{userData?.login}</p>
							<p className="user__info__global__name">{userData?.name}</p>

							<div className="user__info__global__social">
								<p className="user__info__global__social__followers">
									{userData?.followers.totalCount}
									<span className="user__info__global__social__followers__span"> Followers</span>
								</p>
								<p className="user__info__global__social__following">
									{userData?.following.totalCount}
									<span className="user__info__global__social__following__span"> Following</span>
								</p>
							</div>
							<a href={userData?.url} target="_blank" className="user__info__global__github">
								<span>Github Profile</span> <FiGithub />
							</a>
						</div>
					</div>
					<div className="user__info__repositories">
						<SearchBar filter={filteredRepo} setFilter={setFilteredRepo} />
						<div className="user__info__repositories__map">
							{userData?.repositories.nodes.map((repository) => (
								<UserRepositories key={repository.id} filter={filteredRepo} repositories={[repository]} /> //This way we make sure we pass repositories as an array
							))}
						</div>
					</div>
				</>
			)}
		</UserComponentStyles>
	);
};

/**
 * Styles for the UserComponent component.
 */

const UserComponentStyles = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-gap: 7rem;
	padding-top: 1rem;
	height: 100%;
	@media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
		grid-template-columns: 90vh;
		grid-gap: 2rem;
	}
	@media (${breakpoints.mobileMax}px <= width <= ${breakpoints.tabletMax}px) {
		grid-gap: 2rem;
	}
	@media (${breakpoints.tabletMax}px <= width <= ${breakpoints.laptopMax}px) {
		grid-template-columns: 1fr 2fr;
		grid-gap: 2rem;
		margin-left: -5rem;
	}
	& .user__info {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2vh;
		margin-top: 1vh;
		margin-left: 8rem;
		@media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
			display: grid;
			grid-template-columns: 1fr 4.5fr;
			grid-template-rows: 1fr auto;
			grid-column-gap: 2vh;
			grid-row-gap: 0;
			margin-left: 1rem;
		}
		@media (${breakpoints.mobileMax}px <= width <= ${breakpoints.tabletMax}px) {
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			margin-left: 2rem;
		}
		@media (${breakpoints.tabletMax}px <= width <= ${breakpoints.laptopMax}px) {
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			margin-left: 6rem;
		}
		&__pic {
			width: 15rem;
			height: 15rem;
			border-radius: 50%;
			border: 2px solid #218bff;
			@media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
				grid-area: 1 / 1 / 2 / 2;
				width: 5rem;
				height: 5rem;
			}
			@media (${breakpoints.mobileMax}px <= width <= ${breakpoints.tabletMax}px) {
				grid-area: 1 / 1 / 2 / 2;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 8rem;
				height: 8rem;
			}
		}
		&__global {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;
			border: 2px solid #218bff;
			border-radius: 1rem;
			background-color: #fff57e;
			min-width: 25vh;
			@media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
				grid-area: 1 / 2 / 2 / 3;
				width: 25vh;
				max-height: 25vh;
				gap: 0;
				margin-left: -4vh;
			}
			@media (${breakpoints.mobileMax}px <= width <= ${breakpoints.tabletMax}px) {
				width: 30vh;
				max-height: 30vh;
				gap: 0;
				margin-left: 2vh;
			}
			&__username {
				font-size: 2rem;
				font-weight: 600;
				margin-top: 0.5vh;
				margin-bottom: 1vh;
				@media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
					font-size: 1.5rem;
					font-weight: 700;
				}
			}
			&__name {
				font-size: 1.5rem;
				font-weight: 400;
				margin-top: 1vh;
				margin-bottom: 0.5vh;
				@media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
					font-size: 1rem;
					font-weight: 400;
					margin-top: 0;
					margin-bottom: 0;
				}
			}
			&__social {
				display: flex;
				gap: 1rem;
				margin-top: 1vh;
				margin-bottom: 1vh;
				@media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
					font-size: 1rem;
					font-weight: 400;
					margin-top: 0;
					margin-bottom: 0;
				}
				&__followers,
				&__following {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 0.5rem;
					margin-top: 1vh;
					margin-bottom: 1vh;
					&__span {
						font-size: 0.8rem;
						font-weight: 400;
					}
				}
			}
			&__github {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				margin-bottom: 1vh;
				font-size: 1.2rem;
				font-weight: 600;
				color: #218bff;
				text-decoration: none;
				&:hover {
					color: #fff;
					background-color: #218bff;
					border-radius: 0.5rem;
				}
			}
		}
		&__repositories {
			display: flex;
			flex-direction: column;
			margin-top: 1vh;
			margin-left: 7vh;
			max-height: 90vh;
			&__map {
				overflow-y: auto;
			}
			@media (${breakpoints.min}px <= width <= ${breakpoints.tabletMax}px) {
				margin-left: 1vh;
			}
		}
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.loading-spinner {
		border: 8px solid #f3f3f3;
		border-top: 8px solid #3498db;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		animation: spin 2s linear infinite;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999;
	}
`;
export default UserComponent;

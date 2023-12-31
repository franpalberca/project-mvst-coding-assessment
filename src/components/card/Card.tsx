import styled from 'styled-components';
import { breakpoints } from '../../styles/breakpoints';

type Props = {
	name: string;
	url: string;
};
/**
 * Represents a Card component.
 * @component
 * @param {Object} props - The properties of the Card component.
 * @param {string} props.name - The name to display on the card.
 * @param {string} props.url - The URL to display on the card.
 */

const Card = (props: Props) => {
	const {name, url} = props;
	return (
		<CardStyles data-testid='card'>
			<div key={name} className="card__box">
				<h3 className='card__box__title'>{name}</h3>
				<a className='card__box__url' href={url} target="_blank">
					{url}
				</a>
			</div>
		</CardStyles>
	);
};

/**
 * Styles for the Card component.
 */

const CardStyles = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	max-height: 90vh;
	.card__box {
		display: flex;
		flex-direction: column;
		background-color: #fff57e;
		border: 2px solid #218bff;
		border-radius: 0.5rem;
        height: 25vh;
		box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1);
		margin-right: 5rem;
		@media (${breakpoints.min}px <= width <= ${breakpoints.tabletMax}px) {
			margin-right: 3rem;
			width: 40vh;
			height: 10vh;
			gap: 0;
		}
        @media (${breakpoints.tabletMax}px <= width <= ${breakpoints.laptopMax}px) {
            margin-right: 3rem;
            width: 65vh;
            height: 10vh;
            gap: 0;
        }
        @media (${breakpoints.laptopMax}px <= width <= ${breakpoints.bigScreenMax}px) {
			height: 11vh;
        }

		&__title {
            display: flex;
            justify-content: center;
            align-items: center;
			font-size: 2rem;
			font-weight: 600;
            margin-top: 1rem;
            margin-bottom: 0.2rem;
			@media (${breakpoints.min}px <= width <= ${breakpoints.tabletMax}px) {
				font-size: 1rem;
				font-weight: 400;
                margin-top: 0;
			}
            @media (${breakpoints.tabletMax}px <= width <= ${breakpoints.laptopMax}px) {
                font-size: 1.5rem;
                font-weight: 400;
                margin-top: 0;
            }
		}
        &__url {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
            font-weight: 400;
            margin-top: 0;
            margin-bottom: 5rem;
            @media (${breakpoints.min}px <= width <= ${breakpoints.tabletMax}px) {
                font-size: 0.8rem;
                font-weight: 100;
            }
            @media (${breakpoints.tabletMax}px <= width <= ${breakpoints.laptopMax}px) {
                font-size: 1rem;
                font-weight: 100;
            }
		}
	}
`;
export default Card;

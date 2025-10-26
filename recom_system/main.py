#!/usr/bin/env python3
"""
Complete Hybrid Recommendation System
Ready to run with sample data included
"""

import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

class HybridRecommendationSystem:
    def __init__(self):
        self.users = None
        self.products = None
        self.interactions = None
        self.friends = None
        self.user_item_matrix = None
        self.content_embeddings = None
        self.vectorizer = None
        self.trending_scores = None
        
    def load_data(self):
        """Load sample data for testing"""
        # Users
        self.users = pd.DataFrame({
            "user_id": ["u001", "u002", "u003", "u004", "u005"],
            "name": ["Aayush", "Akshat", "Anhad", "Pranjal", "Prayush"],
            "age": [24, 30, 28, 26, 32],
            "location": ["NYC", "LA", "Chicago", "NYC", "LA"]
        })

        # Products
        self.products = pd.DataFrame({
            "product_id": ["p001", "p002", "p003", "p004", "p005", "p006", "p007", "p008"],
            "title": ["Red Running Shoes", "Blue Denim Jeans", "White Cotton T-Shirt", 
                     "Black Baseball Hat", "Green Sneakers", "Gray Hoodie", 
                     "Yellow Dress", "Brown Leather Jacket"],
            "description": ["Stylish red running shoes for athletes and fitness enthusiasts", 
                           "Comfortable blue denim jeans perfect for casual everyday wear",
                           "Plain white cotton t-shirt essential for basic wardrobe", 
                           "Cool black baseball hat provides sun protection and style",
                           "Green sneakers ideal for walking jogging and casual activities",
                           "Warm gray hoodie perfect for cold weather and comfort",
                           "Bright yellow summer dress for special occasions and parties",
                           "Classic brown leather jacket for sophisticated autumn style"],
            "category": ["shoes", "pants", "shirt", "hat", "shoes", "shirt", "dress", "jacket"],
            "price": [120, 80, 25, 30, 100, 60, 75, 200],
            "brand": ["Nike", "Levi's", "Uniqlo", "Adidas", "Puma", "H&M", "Zara", "Coach"]
        })

        
        self.interactions = pd.DataFrame({
            "user_id": ["u001", "u001", "u001", "u001", "u002", "u002", "u002", "u003", 
                       "u003", "u003", "u004", "u004", "u005", "u005", "u001", "u002"],
            "product_id": ["p001", "p002", "p003", "p005", "p002", "p003", "p004", "p001", 
                          "p005", "p006", "p007", "p008", "p006", "p007", "p006", "p008"],
            "interaction_type": ["view", "purchase", "view", "view", "view", "purchase", "view", 
                               "purchase", "view", "view", "purchase", "view", "view", "purchase", 
                               "purchase", "view"],
            "timestamp": [
                datetime.now() - timedelta(days=1),
                datetime.now() - timedelta(days=3),
                datetime.now() - timedelta(days=2),
                datetime.now() - timedelta(hours=5),
                datetime.now() - timedelta(days=1),
                datetime.now() - timedelta(days=2),
                datetime.now() - timedelta(hours=3),
                datetime.now() - timedelta(days=1),
                datetime.now() - timedelta(days=1),
                datetime.now() - timedelta(hours=8),
                datetime.now() - timedelta(days=2),
                datetime.now() - timedelta(days=4),
                datetime.now() - timedelta(hours=2),
                datetime.now() - timedelta(days=1),
                datetime.now() - timedelta(hours=1),
                datetime.now() - timedelta(hours=6),
            ]
        })

        # Social connections
        self.friends = pd.DataFrame({
            "user_id": ["u001", "u001", "u002", "u002", "u003", "u004", "u005"],
            "friend_id": ["u002", "u003", "u003", "u004", "u001", "u001", "u004"]
        })
        
        print(" Data loaded successfully!")
        print(f" Users: {len(self.users)}, Products: {len(self.products)}")
        print(f" Interactions: {len(self.interactions)}, Friend connections: {len(self.friends)}")
        
    def build_content_embeddings(self):
        """Build content-based embeddings using TF-IDF"""
       
        text_data = (self.products['title'] + ' ' + 
                    self.products['description'] + ' ' + 
                    self.products['category'] + ' ' + 
                    self.products['brand'])
        
        self.vectorizer = TfidfVectorizer(
            stop_words='english', 
            max_features=200,
            ngram_range=(1, 2)
        )
        self.content_embeddings = self.vectorizer.fit_transform(text_data).toarray()
        
        print(" Content embeddings built")
        
    def build_user_item_matrix(self):
        """Build user-item interaction matrix with weights"""
       
        interaction_weights = {
            'view': 1.0,
            'purchase': 3.0,
            'like': 2.0,
            'share': 1.5
        }
        
        
        self.interactions['weight'] = self.interactions['interaction_type'].map(interaction_weights)
        
        self.user_item_matrix = self.interactions.pivot_table(
            index='user_id', 
            columns='product_id', 
            values='weight', 
            aggfunc='sum',
            fill_value=0
        )
        
        # Ensure all users and products are included
        all_users = self.users['user_id'].tolist()
        all_products = self.products['product_id'].tolist()
        
        self.user_item_matrix = self.user_item_matrix.reindex(
            index=all_users, 
            columns=all_products, 
            fill_value=0
        )
        
        print(" User-item matrix built")
        
    def calculate_trending_scores(self, half_life=7):
        """Calculate trending scores with time decay"""
        now = pd.Timestamp.now()
        
        # Calculate days since interaction
        self.interactions['days_ago'] = (now - pd.to_datetime(self.interactions['timestamp'])).dt.days
        
        # Apply exponential decay
        self.interactions['decay'] = 0.5 ** (self.interactions['days_ago'] / half_life)
        
        # Weight by interaction type
        interaction_weights = {'view': 1, 'purchase': 3, 'like': 2, 'share': 1.5}
        self.interactions['weighted_decay'] = (
            self.interactions['decay'] * 
            self.interactions['interaction_type'].map(interaction_weights)
        )
        
        # Calculate trending scores
        self.trending_scores = self.interactions.groupby('product_id')['weighted_decay'].sum()
        
        # Ensure all products have a score
        all_products = self.products['product_id'].tolist()
        self.trending_scores = self.trending_scores.reindex(all_products, fill_value=0)
        
        print(" Trending scores calculated")
        
    def get_social_scores(self, user_id):
        """Calculate social influence scores"""
        # Find user's friends
        user_friends = self.friends[self.friends['user_id'] == user_id]['friend_id'].tolist()
        
        if not user_friends:
            return pd.Series(0, index=self.user_item_matrix.columns)
        
        # Get friends' interaction scores
        friends_in_matrix = [f for f in user_friends if f in self.user_item_matrix.index]
        
        if not friends_in_matrix:
            return pd.Series(0, index=self.user_item_matrix.columns)
        
        # Aggregate friends' preferences
        friends_preferences = self.user_item_matrix.loc[friends_in_matrix].sum(axis=0)
        
        return friends_preferences
        
    def get_content_scores(self, user_id):
        """Calculate content-based similarity scores"""
        if user_id not in self.user_item_matrix.index:
            return np.zeros(len(self.products))
        
        user_profile = self.user_item_matrix.loc[user_id].values
        
        if user_profile.sum() == 0:
            return np.zeros(len(self.products))
        
        # Create user content profile as weighted average
        user_content_profile = np.average(self.content_embeddings, axis=0, weights=user_profile)
        
        # Calculate similarity with all products
        content_scores = cosine_similarity([user_content_profile], self.content_embeddings)[0]
        
        return content_scores
        
    def get_collaborative_scores(self, user_id):
        """Calculate collaborative filtering scores"""
        if user_id not in self.user_item_matrix.index:
            return np.zeros(len(self.products))
        
        user_profile = self.user_item_matrix.loc[user_id].values
        
        if user_profile.sum() == 0:
            return np.zeros(len(self.products))
        
        # Calculate item-item similarity
        item_similarity = cosine_similarity(self.content_embeddings)
        
        # Calculate collaborative scores
        cf_scores = np.zeros(len(self.products))
        for i, score in enumerate(user_profile):
            if score > 0:
                cf_scores += item_similarity[i] * score
        
        return cf_scores
        
    def normalize_scores(self, scores):
        """Normalize scores to 0-1 range"""
        scores = np.array(scores)
        if scores.max() == scores.min():
            return np.zeros_like(scores)
        return (scores - scores.min()) / (scores.max() - scores.min())
        
    def recommend(self, user_id, n_recommendations=5, 
                  content_weight=0.3, cf_weight=0.3, 
                  trending_weight=0.3, social_weight=0.1):
        """
        Generate hybrid recommendations for a user
        
        Args:
            user_id: Target user ID
            n_recommendations: Number of recommendations to return
            content_weight: Weight for content-based scoring
            cf_weight: Weight for collaborative filtering
            trending_weight: Weight for trending scores
            social_weight: Weight for social influence
        """
        
        # Calculate individual scores
        content_scores = self.get_content_scores(user_id)
        cf_scores = self.get_collaborative_scores(user_id)
        trending_scores_values = self.trending_scores.values
        social_scores = self.get_social_scores(user_id).values
        
        # Normalize all scores
        content_scores = self.normalize_scores(content_scores)
        cf_scores = self.normalize_scores(cf_scores)
        trending_scores_values = self.normalize_scores(trending_scores_values)
        social_scores = self.normalize_scores(social_scores)
        
        # Calculate hybrid scores
        hybrid_scores = (
            content_weight * content_scores +
            cf_weight * cf_scores +
            trending_weight * trending_scores_values +
            social_weight * social_scores
        )
        
        # Create recommendations dataframe
        recommendations = self.products.copy()
        recommendations['final_score'] = hybrid_scores
        recommendations['content_score'] = content_scores
        recommendations['cf_score'] = cf_scores
        recommendations['trending_score'] = trending_scores_values
        recommendations['social_score'] = social_scores
        
        # Remove items user has already interacted with
        user_interacted = self.interactions[self.interactions['user_id'] == user_id]['product_id'].tolist()
        recommendations = recommendations[~recommendations['product_id'].isin(user_interacted)]
        
        # Sort by hybrid score and return top N
        recommendations = recommendations.sort_values('final_score', ascending=False)
        
        return recommendations.head(n_recommendations)
        
    def explain_recommendation(self, user_id, product_id):
        """Explain why a product was recommended"""
        user_interactions = self.interactions[self.interactions['user_id'] == user_id]
        product_info = self.products[self.products['product_id'] == product_id].iloc[0]
        
        explanations = []
        
        # Content-based explanation
        user_categories = user_interactions.merge(self.products, on='product_id')['category'].value_counts()
        if product_info['category'] in user_categories.index:
            explanations.append(f"You've shown interest in {product_info['category']} items")
        
        # Social explanation
        friends_list = self.friends[self.friends['user_id'] == user_id]['friend_id'].tolist()
        friends_interactions = self.interactions[self.interactions['user_id'].isin(friends_list)]
        if product_id in friends_interactions['product_id'].values:
            explanations.append("Most of your friends have bought this item")
        
        # Trending explanation
        if self.trending_scores[product_id] > self.trending_scores.median():
            explanations.append("This item is currently trending")
        
        return explanations
        
    def run_complete_test(self):
        """Run complete test with all users"""
        print("\n" + "="*60)
        print("🚀 RUNNING COMPLETE RECOMMENDATION SYSTEM TEST")
        print("="*60)
        
        # Load and prepare data
        self.load_data()
        self.build_content_embeddings()
        self.build_user_item_matrix()
        self.calculate_trending_scores()
        
        print("\n📋 USER INTERACTION SUMMARY:")
        print("-" * 40)
        for user_id in self.users['user_id']:
            user_name = self.users[self.users['user_id'] == user_id]['name'].iloc[0]
            user_interactions = self.interactions[self.interactions['user_id'] == user_id]
            
            print(f"\n👤 {user_name} ({user_id}):")
            for _, interaction in user_interactions.iterrows():
                product_name = self.products[self.products['product_id'] == interaction['product_id']]['title'].iloc[0]
                print(f"   • {interaction['interaction_type']}: {product_name}")
        
        print("\n🎯 RECOMMENDATIONS FOR ALL USERS:")
        print("-" * 40)
        
        # Generate recommendations for each user
        for user_id in self.users['user_id']:
            user_name = self.users[self.users['user_id'] == user_id]['name'].iloc[0]
            
            print(f"\n👤 Recommendations for {user_name} ({user_id}):")
            
            recommendations = self.recommend(user_id, n_recommendations=3)
            
            if len(recommendations) == 0:
                print("   No recommendations available")
                continue
            
            for idx, (_, row) in enumerate(recommendations.iterrows(), 1):
                print(f"   {idx}. {row['title']} (${row['price']})")
                print(f"      Score: {row['final_score']:.3f} | Content: {row['content_score']:.3f} | "
                      f"CF: {row['cf_score']:.3f} | Trending: {row['trending_score']:.3f} | "
                      f"Social: {row['social_score']:.3f}")
                
                # Add explanation
                explanations = self.explain_recommendation(user_id, row['product_id'])
                if explanations:
                    print(f"      Why: {', '.join(explanations)}")
        
        print("\n🧪 A/B TESTING DIFFERENT CONFIGURATIONS:")
        print("-" * 40)
        
        test_user = "u001"
        test_user_name = self.users[self.users['user_id'] == test_user]['name'].iloc[0]
        
        configs = [
            {"name": "Content-Heavy", "weights": (0.6, 0.2, 0.1, 0.1)},
            {"name": "Collaborative-Heavy", "weights": (0.2, 0.6, 0.1, 0.1)},
            {"name": "Trending-Heavy", "weights": (0.2, 0.2, 0.5, 0.1)},
            {"name": "Social-Heavy", "weights": (0.2, 0.2, 0.1, 0.5)},
            {"name": "Balanced", "weights": (0.25, 0.25, 0.25, 0.25)}
        ]
        
        for config in configs:
            print(f"\n🔧 {config['name']} Configuration for {test_user_name}:")
            recommendations = self.recommend(test_user, n_recommendations=3, *config['weights'])
            
            for idx, (_, row) in enumerate(recommendations.iterrows(), 1):
                print(f"   {idx}. {row['title']} (Score: {row['final_score']:.3f})")
        
        print("\n" + "="*60)
        print("✅ RECOMMENDATION SYSTEM TEST COMPLETED!")
        print("="*60)

def main():
    print("✅ Main function entered", flush=True)
    rec_system = HybridRecommendationSystem()
    rec_system.run_complete_test()
    """Main function to run the recommendation system"""
    # Create and run the recommendation system
    rec_system = HybridRecommendationSystem()
    rec_system.run_complete_test()
    
    # Example of getting recommendations for a specific user
    print("\n📊 EXAMPLE: Getting recommendations programmatically")
    print("-" * 50)
    
    user_id = "u001"
    recommendations = rec_system.recommend(user_id, n_recommendations=5)
    
    print(f"\nTop 5 recommendations for user {user_id}:")
    for i, (_, row) in enumerate(recommendations.iterrows(), 1):
        print(f"{i}. {row['title']} - ${row['price']} (Score: {row['final_score']:.3f})")
    
    # Example of explanation
    if len(recommendations) > 0:
        top_recommendation = recommendations.iloc[0]
        explanations = rec_system.explain_recommendation(user_id, top_recommendation['product_id'])
        print(f"\nWhy we recommended '{top_recommendation['title']}':")
        for explanation in explanations:
            print(f"• {explanation}")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f" Exception occurred: {e}")
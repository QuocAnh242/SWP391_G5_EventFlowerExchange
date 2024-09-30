package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.EventFlowerPosting;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IEventFlowerPostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventFlowerPostingService implements IEventFlowerPostingService {
    @Autowired
    private IEventFlowerPostingRepository iEventFlowerPostingRepositry;

    @Override
    public List<EventFlowerPosting> getAllEventPostings() {
        return iEventFlowerPostingRepositry.findAll();
    }

    @Override
    public EventFlowerPosting insertEventFlowerPosting(EventFlowerPosting eventFlowerPosting) {
        return iEventFlowerPostingRepositry.save(eventFlowerPosting);
    }

    @Override
    public EventFlowerPosting updateEventFlowerPosting(int postId, EventFlowerPosting eventFlowerPosting) {
        EventFlowerPosting post=iEventFlowerPostingRepositry.getById(postId);
        if(post != null){
            if (eventFlowerPosting.getTitle() != null) {
                post.setTitle(eventFlowerPosting.getTitle());
            }
            if (eventFlowerPosting.getDescription() != null) {
                post.setDescription(eventFlowerPosting.getDescription());
            }
            if (eventFlowerPosting.getPrice() != null) {
                post.setPrice(eventFlowerPosting.getPrice());
            }
            if (eventFlowerPosting.getImageUrl() != null) {
                post.setImageUrl(eventFlowerPosting.getImageUrl());
            }
            if (eventFlowerPosting.getStatus() != null) {
                post.setStatus(eventFlowerPosting.getStatus());
            }
            if (eventFlowerPosting.getCreatedAt() != null) {
                post.setCreatedAt(eventFlowerPosting.getCreatedAt());
            }
            if (eventFlowerPosting.getUpdatedAt() != null) {
                post.setUpdatedAt(eventFlowerPosting.getUpdatedAt());
            }

            if(eventFlowerPosting.getFlowerBatches()!= null) {
                post.setFlowerBatches(eventFlowerPosting.getFlowerBatches());
            }
            iEventFlowerPostingRepositry.save(post);

        }
        return post;
    }

    @Override
    public void deleteEventFlowerPosting(int postId) {
        iEventFlowerPostingRepositry.deleteById(postId);
    }

    @Override
    public Optional<EventFlowerPosting> getEventFlowerPostingById(int postId) {
        return iEventFlowerPostingRepositry.findById(postId);
    }
    public boolean deleteFlowerBatch(int postID, int flowerID) {
        Optional<EventFlowerPosting> optionalPost = iEventFlowerPostingRepositry.findById(postID);
        if (optionalPost.isPresent()) {
            EventFlowerPosting post = optionalPost.get();
            List<FlowerBatch> flowerBatches = post.getFlowerBatches();
            FlowerBatch flowerBatchToRemove = null;
            for (FlowerBatch flowerBatch : flowerBatches) {
                if (flowerBatch.getFlowerID() == flowerID) {
                    flowerBatchToRemove = flowerBatch;
                    break;
                }
            }
            if (flowerBatchToRemove != null) {
                flowerBatches.remove(flowerBatchToRemove);
                post.setFlowerBatches(flowerBatches);
                iEventFlowerPostingRepositry.save(post);
                return true;
            }
        }
        return false; // Không tìm thấy bài đăng hoặc hoa
    }


}

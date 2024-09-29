package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.EventFlowerPosting;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IEventFlowerPostingRepositry;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IFlowerBatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventFlowerPostingService implements IEventFlowerPostingService {
    @Autowired
    private IEventFlowerPostingRepositry iEventFlowerPostingRepositry;

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
            post.setTitle(eventFlowerPosting.getTitle());
            post.setDescription(eventFlowerPosting.getDescription());
            post.setPrice(eventFlowerPosting.getPrice());
            post.setImageUrl(eventFlowerPosting.getImageUrl());
            post.setStatus(eventFlowerPosting.getStatus());
            post.setCreatedAt(eventFlowerPosting.getCreatedAt());
            post.setUpdatedAt(eventFlowerPosting.getUpdatedAt());
            post.setUser(eventFlowerPosting.getUser());
        }
        return null;
    }

    @Override
    public void deleteEventFlowerPosting(int postId) {
        iEventFlowerPostingRepositry.deleteById(postId);
    }

    @Override
    public Optional<EventFlowerPosting> getEventFlowerPostingById(int postId) {
        return iEventFlowerPostingRepositry.findById(postId);
    }


}
